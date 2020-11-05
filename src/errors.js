var Errors = function() {
  this.errors = {};
};

Errors.prototype = {
  constructor: Errors,

  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add: function(attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }

    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  },

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }

    return [];
  },

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|false} First error message or false
   */
  first: function(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }
    // New Add+
    else if(!this.isEmpty()){
      let key = Object.keys(this.errors)[0];
      return this.errors[key][0];
    }else{
      return false;
    }
    // return false;
  },

  /**
   * Get all error messages from all failing attributes
   *
   * @param  {Boolean} full
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all: function(full=false) {
    // New Add+
    if(full && !this.isEmpty()){
      let values = Object.values(this.errors);
      return values.flat();
    }else{
      return this.errors;
    }
  },

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has: function(attribute) {
    if (this.errors.hasOwnProperty(attribute)) {
      return true;
    }

    return false;
  },

  /**
  * isEmpty
  * @return {Boolean}
  */
  isEmpty(){
    return Object.keys(this.errors).length==0;
  }
};

module.exports = Errors;
