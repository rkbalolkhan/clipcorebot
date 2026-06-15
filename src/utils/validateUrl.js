const validateUrl = (url) => {
  if (!url || typeof url !== "string") {
    return {
      valid: false,
      platform: null,
    };
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    // Instagram
    if (
      hostname === "instagram.com" ||
      hostname === "www.instagram.com" ||
      hostname === "instagr.am" ||
      hostname === "www.instagr.am"
    ) {
      return {
        valid: true,
        platform: "instagram",
        url,
      };
    }

    // TikTok
    if (
      hostname === "tiktok.com" ||
      hostname === "www.tiktok.com" ||
      hostname === "vm.tiktok.com" ||
      hostname === "vt.tiktok.com"
    ) {
      return {
        valid: true,
        platform: "tiktok",
        url,
      };
    }

    // Facebook
    if (
      hostname === "facebook.com" ||
      hostname === "www.facebook.com" ||
      hostname === "m.facebook.com" ||
      hostname === "fb.watch"
    ) {
      return {
        valid: true,
        platform: "facebook",
        url,
      };
    }

    // X / Twitter
    if (
      hostname === "twitter.com" ||
      hostname === "www.twitter.com" ||
      hostname === "x.com" ||
      hostname === "www.x.com"
    ) {
      return {
        valid: true,
        platform: "twitter",
        url,
      };
    }

    // YouTube
    if (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "youtu.be"
    ) {
      return {
        valid: true,
        platform: "youtube",
        url,
      };
    }

    return {
      valid: false,
      platform: null,
    };
  } catch {
    return {
      valid: false,
      platform: null,
    };
  }
};

module.exports = validateUrl;
