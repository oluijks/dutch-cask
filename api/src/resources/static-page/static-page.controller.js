const StaticPageModel = require('./static-page.model');
const StaticPageService = require('../static-page');
const {validationResult} = require('express-validator/check');
const staticPageUrl = `${process.env.HOSTNAME}:${
  process.env.HTTPS_PORT
}/api/static-pages`;

/**
 * Find static pages.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const find = async (req, res, next) => {
  try {
    const result = await StaticPageService.find();
    if (!result || result.length < 1) {
      const static_pages = [];
      return res.status(200).json({
        status: '200',
        count: 0,
        static_pages,
        links: {
          self: staticPageUrl,
        },
      });
    }
    const static_pages = staticPageResponse(result, req.method);
    res.status(200).json([
      {
        status: '200',
        count: result.length,
        static_pages,
        links: {
          self: staticPageUrl,
        },
      },
    ]);
  } catch (error) {
    next(error);
  }
};

/**
 * Find static page by id.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const findById = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const static_page = await StaticPageService.findById(req.params.id);
    if (!static_page) {
      return staticPageNotFoundResponse(req.params.id, res);
    }

    const data = staticPageResponse([static_page], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${staticPageUrl}/${static_page._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

const findBySlug = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = errors.mapped();
      const errorAttributes = [
        {
          location: validationError.id.location,
          parameter: validationError.id.param,
          value: validationError.id.value,
          title: validationError.id.msg,
        },
      ];
      return res.status(422).json({
        status: '422',
        title: errorAttributes.title,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const static_page = await StaticPageService.findBySlug(req.params.slug);
    if (!static_page) {
      return staticPageNotFoundResponse(req.params.id, res);
    }

    const data = staticPageResponse([static_page], req.method);
    res.status(200).json({
      status: '200',
      count: 1,
      data,
      links: {
        self: `${staticPageUrl}/${static_page._id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a static page.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = errors.mapped();
      const errorAttributes = validationErrors._error.nestedErrors.map(
        errors => {
          return {
            location: errors.location,
            parameter: errors.param,
            value: errors.value,
            title: errors.msg,
          };
        }
      );
      return res.status(422).json({
        status: '422',
        title: validationErrors._error.msg,
        errors: errorAttributes,
      });
    }
  } catch (error) {
    next(error);
  }

  try {
    const {title, sub_title, intro, body} = req.body;
    const static_page = await StaticPageService.create({
      title,
      sub_title,
      intro,
      body,
    });
    res.status(200).json(static_page);
  } catch (error) {
    next(error);
  }
};

/**
 * Default response.
 * @param {*} static_pages
 * @param {*} method
 */
const staticPageResponse = (static_pages, method) => {
  return static_pages.map(static_page => {
    return {
      type: 'static_page  ',
      static_page_id: static_page._id,
      attributes: {
        title: static_page.title,
        slug: static_page.slug,
        sub_title: static_page.sub_title,
        intro: static_page.intro,
        body: static_page.body,
        timestamps: {
          created_at: static_page.created_at,
          updated_at: static_page.updated_at,
        },
      },
      categories: static_page.categories,
      request: {
        method,
        link: `${staticPageUrl}/${static_page._id}`,
      },
    };
  });
};

/**
 * Not found response.
 * @param {*} id
 * @param {*} res
 */
const staticPageNotFoundResponse = (id, res) => {
  res.status(404).json({
    status: '404',
    errors: [
      {
        title: 'Not Found',
        detail: `Api Static Page with id ${id} was not found`,
      },
    ],
  });
};

module.exports = {find, findById, findBySlug, create};
