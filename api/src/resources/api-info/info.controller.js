// const headers = {
//   'Server-Timing': `
//       lb=18; "Load Balancer",
//       server-3=104; "Server #3 Startup",
//       db-read=187; "Database Read",
//       aws-download=317; "AWS Content Download",
//       db-write=218; "Database Write",
//       templating=48; "Templating plugin"
//   `.replace(/\n/g, ''),
// };

const getApiInfo = (req, res) => {
  res.status(200).json({
    jsonapi: {
      version: process.env.VERSION,
    },
    meta: {
      authors: ['Olaf Luijks'],
      description: process.env.DESCRIPTION,
      license: process.env.LICENSE,
      support: process.env.SUPPORT_EMAIL,
    },
  });
};

module.exports = { getApiInfo };
