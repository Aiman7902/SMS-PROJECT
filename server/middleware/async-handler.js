/**
 * Async handler wrapper
 * Catches async errors and passes them to error middleware
 * No more try-catch in every controller!
 */

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};