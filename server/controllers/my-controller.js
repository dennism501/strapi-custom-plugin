'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('custom-email')
      .service('myService')
      .getWelcomeMessage();
  },
  async send(ctx) {
    const emailAddress = ctx.request.body.emailAddress;
    const subject = ctx.request.body.subject;
    const content = ctx.request.body.content;
    await strapi
      .plugin('custom-email')
      .service('myService')
      .sendEmail(emailAddress, subject, content);

      await ctx.send({message: "Email sent!"})
  },
};
