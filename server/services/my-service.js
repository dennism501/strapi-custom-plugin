'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },

  async sendEmail(emailAddress, subject, content) {
    await strapi.plugin('email').service('email').send({
      to: emailAddress,
      from: 'admin@strapi.io',
      subject,
      text: content,
    });
  },
});
