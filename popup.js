/**
 * 
 * @constructor
 */
var PopupController = function () {
    this.button_ = document.getElementById('button');
    this.timeframe_ = document.getElementById('timeframe');
    this.addListeners_();
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.PC = new PopupController();
  });
  
  PopupController.prototype = {
    /**
     * @type {Element}
     * @private
     */
    button_: null,
  
    /**
     * @type {Element}
     * @private
     */
    timeframe_: null,
  
    /**
     * @private
     */
    addListeners_: function () {
      this.button_.addEventListener('click', this.handleClick_.bind(this));
    },
  
    /**
     * @private
     */
    handleCallback_: function () {
      var success = document.createElement('div');
      success.classList.add('overlay');
      success.setAttribute('role', 'alert');
      success.textContent = 'Data has been cleared.';
      document.body.appendChild(success);
  
      setTimeout(function() { success.classList.add('visible'); }, 10);
      setTimeout(function() {
        if (close === false)
          success.classList.remove('visible');
        else
          window.close();
      }, 4000);
    },
  
    /**
     * @private
     */
    handleClick_: function () {
        this.button_.setAttribute('disabled', 'disabled');
        this.button_.innerText = 'Clearing...';
          chrome.browsingData.remove({
            "origins": ["https://www.unc.edu"]
          }, {
            "cacheStorage": true,
            "cookies": true,
            "fileSystems": true,
            "indexedDB": true,
            "localStorage": true,
            "pluginData": true,
            "serviceWorkers": true,
            "webSQL": true
          }, 
            this.handleCallback_.bind(this));
    }
  };
