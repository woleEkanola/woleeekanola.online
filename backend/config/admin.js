module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9e20cb764ff91f880c6fc0dd3efb8bdf'),
  },
});
