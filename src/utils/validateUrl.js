const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { valid: false, platform: null };
  }

  if (url.includes('instagram.com') || url.includes('instagra.m')) {
    return { valid: true, platform: 'instagram' };
  }

  if (url.includes('tiktok.com') || url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
    return { valid: true, platform: 'tiktok' };
  }

  return { valid: false, platform: null };
};

module.exports = validateUrl;
