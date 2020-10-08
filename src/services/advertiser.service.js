class AdvertiserService {
  getAssets() {
    // /advertisers/{id}/asset
    return Auth.currentAuthenticatedUser().then(() => true).catch(() => false);
  }
}

export default new AdvertiserService();
