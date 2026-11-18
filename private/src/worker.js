const enc = new TextEncoder();

function safeEqual(a, b) {
  const x = enc.encode(a);
  const y = enc.encode(b);
  const len = Math.max(x.length, y.length);
  let diff = x.length ^ y.length;
  for (let i = 0; i < len; i += 1) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}

export default {
  async fetch(request, env) {
    const given = request.headers.get('Authorization') || '';
    const valid = Boolean(env.PEAKIZM_USER && env.PEAKIZM_PASS);
    const expected = valid ? 'Basic ' + btoa(`${env.PEAKIZM_USER}:${env.PEAKIZM_PASS}`) : '';

    if (!valid || !safeEqual(given, expected)) {
      return new Response('peakizm internal — credentials required\n', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="peakizm internal", charset="UTF-8"',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }

    const asset = await env.ASSETS.fetch(request);
    const res = new Response(asset.body, asset);
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('X-Content-Type-Options', 'nosniff');
    res.headers.set('X-Frame-Options', 'DENY');
    res.headers.set('Referrer-Policy', 'no-referrer');
    return res;
  },
};
