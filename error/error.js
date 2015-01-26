function NotFound(message) {
  this.name = 'NotFound';
  this.message = 'Not found';
}
NotFound.prototype = Object.create(Error.prototype);
NotFound.prototype.constructor = NotFound;

module.exports = {
  NotFound:NotFound
};