System.register("chunks:///_virtual/DailyTidyAudio.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DailyTidyWeather.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, resources, AudioClip, Node, AudioSource, WEATHER_STATES;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      AudioClip = module.AudioClip;
      Node = module.Node;
      AudioSource = module.AudioSource;
    }, function (module) {
      WEATHER_STATES = module.WEATHER_STATES;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ee46cE/7pVJBKmOzcVt+i2T", "DailyTidyAudio", undefined);
      var EFFECT_VOLUME = {
        collect: 0.34,
        change_box: 0.34,
        hint: 0.32,
        win: 0.4,
        blocked: 0.21
      };
      var AMBIENCE_VOLUME = {
        sunny: 0.23,
        rain: 0.29,
        snow: 0.25
      };
      var DailyTidyAudio = exports('DailyTidyAudio', /*#__PURE__*/function () {
        function DailyTidyAudio(node) {
          this.music = void 0;
          this.ambience = void 0;
          this.environment = new Map();
          this.effects = new Map();
          this.weather = 'sunny';
          this.receivedGesture = false;
          this.enabled = true;
          this.node = node;
          this.music = this.createSource('Music', 0.28, true);
          this.ambience = this.createSource('Ambience', AMBIENCE_VOLUME.sunny, true);
        }
        var _proto = DailyTidyAudio.prototype;
        _proto.load = function load() {
          var _this = this;
          this.loadClip('music', function (clip) {
            _this.music.clip = clip;
            if (_this.canPlay()) _this.music.play();
          });
          var _loop2 = function _loop2() {
            var weather = _step.value;
            _this.loadClip(weather, function (clip) {
              _this.environment.set(weather, clip);
              if (weather === _this.weather) _this.applyAmbience();
            });
          };
          for (var _iterator = _createForOfIteratorHelperLoose(WEATHER_STATES), _step; !(_step = _iterator()).done;) {
            _loop2();
          }
          var _loop = function _loop() {
            var effect = _arr[_i];
            _this.loadClip(effect, function (clip) {
              var source = _this.createSource(effect, EFFECT_VOLUME[effect], false);
              source.clip = clip;
              _this.effects.set(effect, source);
            });
          };
          for (var _i = 0, _arr = Object.keys(EFFECT_VOLUME); _i < _arr.length; _i++) {
            _loop();
          }
        };
        _proto.unlock = function unlock() {
          if (this.receivedGesture) return;
          this.receivedGesture = true;
          if (this.enabled) this.resumeLoops();
        };
        _proto.setWeather = function setWeather(weather) {
          if (weather === this.weather) return;
          this.weather = weather;
          this.applyAmbience();
        };
        _proto.setEnabled = function setEnabled(enabled) {
          if (enabled === this.enabled) return;
          this.enabled = enabled;
          if (this.canPlay()) {
            this.resumeLoops();
          } else {
            if (this.music.clip) this.music.pause();
            if (this.ambience.clip) this.ambience.pause();
            for (var _iterator2 = _createForOfIteratorHelperLoose(this.effects.values()), _step2; !(_step2 = _iterator2()).done;) {
              var source = _step2.value;
              source.stop();
            }
          }
        };
        _proto.play = function play(effect) {
          var _this$effects$get;
          if (this.canPlay()) (_this$effects$get = this.effects.get(effect)) == null || _this$effects$get.play();
        };
        _proto.applyAmbience = function applyAmbience() {
          var _this$environment$get;
          var clip = (_this$environment$get = this.environment.get(this.weather)) != null ? _this$environment$get : null;
          if (this.ambience.clip === clip) return;
          if (this.ambience.clip) this.ambience.stop();
          this.ambience.clip = clip;
          this.ambience.volume = AMBIENCE_VOLUME[this.weather];
          if (clip && this.canPlay()) this.ambience.play();
        };
        _proto.resumeLoops = function resumeLoops() {
          if (this.music.clip) this.music.play();
          if (this.ambience.clip) this.ambience.play();
        };
        _proto.canPlay = function canPlay() {
          return this.enabled && this.receivedGesture;
        };
        _proto.loadClip = function loadClip(name, ready) {
          var _this2 = this;
          resources.load("audio/storybook/" + name, AudioClip, function (error, clip) {
            if (error) {
              console.warn("Could not load Daily Tidy audio: " + name, error);
              return;
            }
            if (_this2.node.isValid) ready(clip);
          });
        };
        _proto.createSource = function createSource(name, volume, loop) {
          var child = new Node(name);
          var source = child.addComponent(AudioSource);
          source.playOnAwake = false;
          source.loop = loop;
          source.volume = volume;
          this.node.addChild(child);
          return source;
        };
        return DailyTidyAudio;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DailyTidyRoot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LevelData.ts', './DailyTidyAudio.ts', './DailyTidyWeather.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, _extends, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Color, view, ResolutionPolicy, Camera, Layers, profiler, Node, UITransform, Mask, Sprite, Graphics, Vec3, Tween, tween, BlockInputEvents, Vec2, Label, Component, resources, SpriteFrame, LEVELS, ITEM_CATEGORY, CATEGORY_NAME, DailyTidyAudio, DailyTidyWeather, WEATHER_STATES, WEATHER_LIGHT, WEATHER_LABEL;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      view = module.view;
      ResolutionPolicy = module.ResolutionPolicy;
      Camera = module.Camera;
      Layers = module.Layers;
      profiler = module.profiler;
      Node = module.Node;
      UITransform = module.UITransform;
      Mask = module.Mask;
      Sprite = module.Sprite;
      Graphics = module.Graphics;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      tween = module.tween;
      BlockInputEvents = module.BlockInputEvents;
      Vec2 = module.Vec2;
      Label = module.Label;
      Component = module.Component;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      LEVELS = module.LEVELS;
      ITEM_CATEGORY = module.ITEM_CATEGORY;
      CATEGORY_NAME = module.CATEGORY_NAME;
    }, function (module) {
      DailyTidyAudio = module.DailyTidyAudio;
    }, function (module) {
      DailyTidyWeather = module.DailyTidyWeather;
      WEATHER_STATES = module.WEATHER_STATES;
      WEATHER_LIGHT = module.WEATHER_LIGHT;
      WEATHER_LABEL = module.WEATHER_LABEL;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "3a47aC16hRFUqw5k/bKXHDB", "DailyTidyRoot", undefined);
      var ccclass = _decorator.ccclass;
      var W = 720;
      var H = 1280;
      var ROOM_TOP = 380;
      var ROOM_BOTTOM = -H / 2;
      var ROOM_VIEW_Y = (ROOM_TOP + ROOM_BOTTOM) / 2;
      var ROOM_VIEW_H = ROOM_TOP - ROOM_BOTTOM;
      var ROOM_START_INSET = 78;
      var PROGRESS_WIDTH = 438;
      var ROOM_ASSET = 'attic';
      var UI_ASSETS = ['logo', 'restart', 'find', 'track', 'bin_toys', 'bin_books', 'bin_clothes', 'bin_sports', 'bin_empty'];

      // Visible body and contact point as fractions of each untrimmed sprite.
      var ITEM_FOOTPRINT = {
        teddy: {
          center: 0.502,
          bottom: 0.018,
          width: 0.955,
          height: 0.964
        },
        car: {
          center: 0.500,
          bottom: 0.029,
          width: 0.965,
          height: 0.942
        },
        train: {
          center: 0.500,
          bottom: 0.020,
          width: 0.965,
          height: 0.961
        },
        blue_book: {
          center: 0.502,
          bottom: 0.031,
          width: 0.968,
          height: 0.930
        },
        red_book: {
          center: 0.500,
          bottom: 0.031,
          width: 0.965,
          height: 0.931
        },
        green_book: {
          center: 0.498,
          bottom: 0.031,
          width: 0.968,
          height: 0.938
        },
        shirt: {
          center: 0.498,
          bottom: 0.026,
          width: 0.968,
          height: 0.942
        },
        hat: {
          center: 0.498,
          bottom: 0.026,
          width: 0.961,
          height: 0.949
        },
        ball: {
          center: 0.500,
          bottom: 0.022,
          width: 0.958,
          height: 0.956
        }
      };
      var SWIPE_THRESHOLD = 15;
      var SWIPE_SAMPLE_MS = 175;
      var SWIPE_RELEASE_MS = 155;
      var ROOM_FRICTION = 7;
      var MAX_ROOM_SPEED = 2450;
      var MIN_ROOM_SPEED = 32;
      var INK = new Color('#50321F');
      var DailyTidyRoot = exports('DailyTidyRoot', (_dec = ccclass('DailyTidyRoot'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DailyTidyRoot, _Component);
        function DailyTidyRoot() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.frames = new Map();
          _this.levelIndex = 0;
          _this.level = void 0;
          _this.piles = [];
          _this.bins = [];
          _this.itemViews = [];
          _this.remaining = {
            toys: 0,
            books: 0,
            clothes: 0,
            sports: 0
          };
          _this.collected = {
            toys: 0,
            books: 0,
            clothes: 0,
            sports: 0
          };
          _this.total = {
            toys: 0,
            books: 0,
            clothes: 0,
            sports: 0
          };
          _this.room = null;
          _this.roomWidth = W;
          _this.roomArt = null;
          _this.weatherView = null;
          _this.weather = 'sunny';
          _this.weatherLabel = null;
          _this.weatherIcon = null;
          _this.soundIcon = null;
          _this.audio = null;
          _this.soundEnabled = true;
          _this.roomPosition = null;
          _this.roomTouch = null;
          _this.roomVelocity = 0;
          _this.levelRoot = null;
          _this.overlay = null;
          _this.status = null;
          _this.hasShownExploreTip = false;
          _this.busy = false;
          _this.progressText = null;
          _this.progressBar = null;
          _this.shownHint = false;
          return _this;
        }
        var _proto = DailyTidyRoot.prototype;
        _proto.onLoad = function onLoad() {
          var _this$node$getChildBy;
          // Keep the entire portrait composition visible in wider web previews.
          view.setDesignResolutionSize(W, H, ResolutionPolicy.SHOW_ALL);
          var camera = (_this$node$getChildBy = this.node.getChildByName('Camera')) == null ? void 0 : _this$node$getChildBy.getComponent(Camera);
          if (camera) {
            camera.near = 1;
            camera.far = 2000;
            camera.visibility = Layers.Enum.UI_2D;
          }
          var backdrop = this.node.getChildByName('RoomBackdrop');
          if (backdrop) backdrop.active = false;
          profiler.hideStats();
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _this2 = this;
            var paths;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  profiler.hideStats();
                  this.audio = new DailyTidyAudio(this.makeNode(this.node, 'Daily Tidy audio'));
                  this.audio.load();
                  this.node.on(Node.EventType.TOUCH_END, this.unlockAudio, this, true);
                  this.showLoading();
                  paths = [[ROOM_ASSET, "art/storybook/" + ROOM_ASSET]].concat(Object.keys(ITEM_CATEGORY).map(function (name) {
                    return [name, "art/storybook/items/" + name];
                  }), UI_ASSETS.map(function (name) {
                    return [name, "art/storybook/ui/" + name];
                  }));
                  _context2.prev = 6;
                  _context2.next = 9;
                  return Promise.all(paths.map( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
                    var name, path, frame;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          name = _ref[0], path = _ref[1];
                          _context.next = 3;
                          return new Promise(function (resolve, reject) {
                            resources.load(path + "/spriteFrame", SpriteFrame, function (error, asset) {
                              return error ? reject(error) : resolve(asset);
                            });
                          });
                        case 3:
                          frame = _context.sent;
                          _this2.frames.set(name, frame);
                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  }))));
                case 9:
                  this.loadLevel(0);
                  _context2.next = 17;
                  break;
                case 12:
                  _context2.prev = 12;
                  _context2.t0 = _context2["catch"](6);
                  this.clearDynamicNodes();
                  this.makeLabel(this.node, 'Could not load art. Open the project in Cocos Creator first.', 0, 0, 540, 60, 28, INK);
                  console.error(_context2.t0);
                case 17:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[6, 12]]);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.update = function update(dt) {
          this.advanceRoom(dt);
          if (!this.weatherView || !this.room) return;
          var window = this.weatherView.node;
          var left = window.position.x + this.room.position.x;
          if (left < W / 2 && left + 806 * window.scale.x > -W / 2) this.weatherView.update(dt);
        };
        _proto.onDestroy = function onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this.unlockAudio, this, true);
        };
        _proto.unlockAudio = function unlockAudio() {
          var _this$audio;
          (_this$audio = this.audio) == null || _this$audio.unlock();
          this.node.off(Node.EventType.TOUCH_END, this.unlockAudio, this, true);
        };
        _proto.showLoading = function showLoading() {
          this.clearDynamicNodes();
          this.makePanel(this.node, 'Loading', 0, 0, W, H, new Color('#F6EFE2'), 0);
          this.makeLabel(this.node, 'Preparing your room…', 0, 0, 500, 60, 30, INK);
        };
        _proto.loadLevel = function loadLevel(index) {
          this.levelIndex = index % LEVELS.length;
          this.level = LEVELS[this.levelIndex];
          this.piles = this.level.piles.map(function (p) {
            return [].concat(p.items);
          });
          this.remaining = {
            toys: 0,
            books: 0,
            clothes: 0,
            sports: 0
          };
          this.collected = {
            toys: 0,
            books: 0,
            clothes: 0,
            sports: 0
          };
          this.shownHint = false;
          for (var _iterator = _createForOfIteratorHelperLoose(this.piles), _step; !(_step = _iterator()).done;) {
            var pile = _step.value;
            for (var _iterator2 = _createForOfIteratorHelperLoose(pile), _step2; !(_step2 = _iterator2()).done;) {
              var item = _step2.value;
              this.remaining[ITEM_CATEGORY[item]]++;
            }
          }
          this.total = _extends({}, this.remaining);
          this.roomTouch = null;
          this.roomVelocity = 0;
          this.busy = false;
          this.overlay = null;
          this.clearDynamicNodes();
          this.levelRoot = this.makeNode(this.node, 'Level');
          this.roomPosition = null;
          this.drawRoom();
          this.drawHeader();
          this.drawPiles();
          this.drawBins();
          this.updateProgress();
          if (!this.hasShownExploreTip) {
            this.hasShownExploreTip = true;
            this.setStatus('Swipe to explore');
          }
        };
        _proto.drawRoom = function drawRoom() {
          var viewport = this.makeNode(this.levelRoot, 'Room viewport');
          viewport.setPosition(0, ROOM_VIEW_Y);
          viewport.addComponent(UITransform).setContentSize(W, ROOM_VIEW_H);
          viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          viewport.on(Node.EventType.TOUCH_START, this.beginRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_MOVE, this.moveRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_END, this.endRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_CANCEL, this.cancelRoomTouch, this);
          this.room = this.makeNode(viewport, 'Scrollable room');
          var source = this.frames.get(ROOM_ASSET).originalSize;
          this.roomWidth = ROOM_VIEW_H * source.width / source.height;
          this.roomArt = this.makeSprite(this.room, ROOM_ASSET, 0, 0, this.roomWidth, ROOM_VIEW_H).getComponent(Sprite);
          var scale = ROOM_VIEW_H / source.height;
          var weather = this.makeNode(this.room, 'Window weather');
          weather.setPosition(-this.roomWidth / 2 + 155 * scale, ROOM_VIEW_H / 2 - 80 * scale);
          weather.setScale(scale / 2, scale / 2, 1);
          this.weatherView = new DailyTidyWeather(weather);
          this.applyWeather();
          this.panRoom((this.roomWidth - W) / 2 - ROOM_START_INSET);
          var headerHeight = H / 2 - ROOM_TOP;
          this.makePanel(this.levelRoot, 'Header', 0, ROOM_TOP + headerHeight / 2, W, headerHeight, new Color('#F7E8D4'), 0);
          this.makePanel(this.levelRoot, 'Shelf edge', 0, ROOM_TOP, W, 4, new Color('#D3B394'), 0);
        };
        _proto.drawHeader = function drawHeader() {
          var _this3 = this;
          this.makeSprite(this.levelRoot, 'logo', -131, 590, 384);
          this.drawWeatherControls();
          var reset = this.makeSprite(this.levelRoot, 'restart', 299, 582, 66);
          reset.on(Node.EventType.TOUCH_END, function () {
            return _this3.loadLevel(_this3.levelIndex);
          }, this);
          this.makeSprite(this.levelRoot, 'track', 0, 521, 462, 31);
          this.progressBar = this.makeNode(this.levelRoot, 'Progress fill').addComponent(Graphics);
          this.progressBar.node.setPosition(-PROGRESS_WIDTH / 2, 521);
          this.progressText = this.makeLabel(this.levelRoot, '', 0, 521, 192, 27, 21, INK, true);
        };
        _proto.drawWeatherControls = function drawWeatherControls() {
          var _this4 = this;
          var weather = this.makePanel(this.levelRoot, 'Weather', 136, 583, 125, 53, new Color('#EFE0C9'), 23);
          this.weatherLabel = this.makeLabel(weather, '', 15, 0, 77, 35, 19, INK, true);
          var icon = this.makeNode(weather, 'Weather icon');
          icon.setPosition(-41, 0);
          this.weatherIcon = icon.addComponent(Graphics);
          this.updateWeatherControl();
          weather.on(Node.EventType.TOUCH_END, function () {
            var index = WEATHER_STATES.indexOf(_this4.weather);
            _this4.weather = WEATHER_STATES[(index + 1) % WEATHER_STATES.length];
            _this4.applyWeather();
            _this4.updateWeatherControl();
          }, this);
          var audio = this.makePanel(this.levelRoot, 'Audio toggle', 228, 583, 49, 53, new Color('#EFE0C9'), 23);
          this.soundIcon = this.makeNode(audio, 'Speaker icon').addComponent(Graphics);
          this.updateSoundControl();
          audio.on(Node.EventType.TOUCH_END, function () {
            var _this4$audio;
            _this4.soundEnabled = !_this4.soundEnabled;
            (_this4$audio = _this4.audio) == null || _this4$audio.setEnabled(_this4.soundEnabled);
            _this4.updateSoundControl();
            _this4.setStatus(_this4.soundEnabled ? 'Sound on' : 'Sound off');
          }, this);
        };
        _proto.applyWeather = function applyWeather() {
          var _this$weatherView, _this$audio2;
          if (this.roomArt) this.roomArt.color = WEATHER_LIGHT[this.weather];
          (_this$weatherView = this.weatherView) == null || _this$weatherView.setWeather(this.weather);
          (_this$audio2 = this.audio) == null || _this$audio2.setWeather(this.weather);
        };
        _proto.updateWeatherControl = function updateWeatherControl() {
          this.weatherLabel.string = WEATHER_LABEL[this.weather];
          var icon = this.weatherIcon;
          icon.clear();
          icon.strokeColor = INK;
          icon.lineWidth = 2;
          if (this.weather === 'rain') {
            icon.moveTo(-12, 0);
            icon.quadraticCurveTo(-14, 8, -6, 8);
            icon.quadraticCurveTo(-2, 18, 6, 10);
            icon.quadraticCurveTo(14, 10, 12, 2);
            icon.lineTo(-12, 0);
            for (var _i = 0, _arr = [-7, 0, 7]; _i < _arr.length; _i++) {
              var x = _arr[_i];
              icon.moveTo(x, -5);
              icon.lineTo(x - 3, -11);
            }
          } else if (this.weather === 'sunny') {
            icon.circle(0, 0, 5.7);
            for (var i = 0; i < 8; i++) {
              var a = i * Math.PI / 4;
              icon.moveTo(Math.cos(a) * 9, Math.sin(a) * 9);
              icon.lineTo(Math.cos(a) * 12, Math.sin(a) * 12);
            }
          } else {
            for (var _i2 = 0; _i2 < 6; _i2++) {
              var _a = _i2 * Math.PI / 3;
              var _x2 = Math.cos(_a);
              var y = Math.sin(_a);
              icon.moveTo(0, 0);
              icon.lineTo(12 * _x2, 12 * y);
              icon.moveTo(7 * _x2 + 3 * y, 7 * y - 3 * _x2);
              icon.lineTo(9 * _x2, 9 * y);
              icon.lineTo(7 * _x2 - 3 * y, 7 * y + 3 * _x2);
            }
          }
          icon.stroke();
        };
        _proto.updateSoundControl = function updateSoundControl() {
          var icon = this.soundIcon;
          icon.clear();
          icon.strokeColor = INK;
          icon.lineWidth = 2.6;
          icon.moveTo(-13, 4);
          icon.lineTo(-7, 4);
          icon.lineTo(1, 10);
          icon.lineTo(1, -10);
          icon.lineTo(-7, -4);
          icon.lineTo(-13, -4);
          icon.close();
          if (this.soundEnabled) {
            icon.moveTo(6, 5);
            icon.quadraticCurveTo(13, 0, 6, -5);
            icon.moveTo(10, 9);
            icon.quadraticCurveTo(21, 0, 10, -9);
          } else {
            icon.moveTo(5, 5);
            icon.lineTo(14, -5);
            icon.moveTo(14, 5);
            icon.lineTo(5, -5);
          }
          icon.stroke();
        };
        _proto.drawPiles = function drawPiles() {
          var _this5 = this;
          this.itemViews = [];
          var roomSize = this.frames.get(ROOM_ASSET).originalSize;
          var artScale = ROOM_VIEW_H / roomSize.height;
          var order = Array.from(this.level.piles.keys()).sort(function (a, b) {
            return _this5.level.piles[a].y - _this5.level.piles[b].y;
          });
          var _loop = function _loop() {
            var pileIndex = _step3.value;
            var pile = _this5.level.piles[pileIndex];
            var baseWidth = pile.width * artScale;
            var baseX = (pile.x - roomSize.width / 2) * artScale;
            var contactY = (roomSize.height / 2 - pile.y) * artScale;
            _this5.piles[pileIndex].forEach(function (kind, index) {
              var _pile$angle, _pile$stackOffset;
              var widthRatio = index === 0 ? 1 : 0.79;
              var visibleWidth = baseWidth * widthRatio * (kind === 'ball' ? 0.76 : 1);
              var contactShadow = index === 0 ? _this5.drawContactShadow(baseX, contactY, visibleWidth) : undefined;
              var n = _this5.makeNode(_this5.room, kind + "-" + pileIndex + "-" + index);
              var angle = (_pile$angle = pile.angle) != null ? _pile$angle : 0;
              var offset = index === 0 ? 0 : baseWidth * ((_pile$stackOffset = pile.stackOffset) != null ? _pile$stackOffset : 0);
              n.angle = index === 0 ? angle : angle * 0.45;
              var trans = n.addComponent(UITransform);
              var sprite = n.addComponent(Sprite);
              sprite.sizeMode = Sprite.SizeMode.CUSTOM;
              sprite.trim = false;
              var frame = _this5.frames.get(kind);
              sprite.spriteFrame = frame;
              var source = frame.originalSize;
              var footprint = ITEM_FOOTPRINT[kind];
              var width = visibleWidth / footprint.width;
              var height = width * source.height / source.width;
              var visibleHeight = height * footprint.height;
              var ball = kind === 'ball';
              trans.setContentSize(width, height);
              // A ball rotates around its center while its contact point stays on the floor.
              trans.setAnchorPoint(footprint.center, footprint.bottom + (ball ? footprint.height / 2 : 0));
              n.setPosition(baseX + offset, contactY + (ball ? visibleHeight / 2 : 0));
              _this5.itemViews.push({
                node: n,
                kind: kind,
                pile: pileIndex,
                index: index,
                home: n.position.clone(),
                homeAngle: n.angle,
                rollOffset: 0,
                visibleWidth: visibleWidth,
                visibleHeight: visibleHeight,
                contactShadow: contactShadow
              });

              // The contact is on the top face of the book or folded shirt below.
              contactY += visibleHeight * 0.43;
            });
          };
          for (var _iterator3 = _createForOfIteratorHelperLoose(order), _step3; !(_step3 = _iterator3()).done;) {
            _loop();
          }
        };
        _proto.drawContactShadow = function drawContactShadow(x, y, width) {
          var shadow = this.makeNode(this.room, 'Contact shadow');
          shadow.setPosition(x, y + width * 0.035);
          var graphics = shadow.addComponent(Graphics);
          graphics.fillColor = new Color(65, 37, 17, 32);
          graphics.ellipse(0, 0, width * 0.45, width * 0.09);
          graphics.fill();
          graphics.fillColor = new Color(65, 37, 17, 36);
          graphics.ellipse(0, 0, width * 0.32, width * 0.06);
          graphics.fill();
          return shadow;
        };
        _proto.drawBins = function drawBins() {
          var _this6 = this;
          this.bins = [];
          var message = this.makePanel(this.levelRoot, 'Room message', -131, -580, 394, 44, new Color(250, 237, 218, 238), 20);
          this.status = this.makeLabel(message, '', 0, 0, 372, 33, 19, INK, true);
          message.active = false;
          this.roomPosition = this.makeNode(this.levelRoot, 'Room position').addComponent(Graphics);
          this.roomPosition.node.setPosition(-35, -616);
          this.updateRoomPosition();
          var count = this.level.active.length;
          var width = count === 2 ? 252 : 222;
          var gap = 11;
          this.level.active.forEach(function (category, i) {
            var x = (i - (count - 1) / 2) * (width + gap);
            var bin = {
              category: category,
              node: _this6.makeNode(_this6.levelRoot, 'Bin'),
              x: x,
              y: 444,
              width: width,
              height: 94,
              highlight: null
            };
            bin.node.setPosition(x, bin.y);
            _this6.bins.push(bin);
            _this6.renderBin(bin);
          });
          var hint = this.makeSprite(this.levelRoot, 'find', 222, -595, 236, 64);
          var lens = this.makeNode(hint, 'Magnifier');
          lens.setPosition(-77, 1);
          var icon = lens.addComponent(Graphics);
          icon.strokeColor = INK;
          icon.lineWidth = 3.1;
          icon.circle(-3, 4, 9);
          icon.stroke();
          icon.moveTo(4, -3);
          icon.lineTo(12, -11);
          icon.stroke();
          this.makeLabel(hint, 'Find an Item', 15, 1, 164, 35, 22, INK, true);
          hint.on(Node.EventType.TOUCH_END, this.showHint, this);
        };
        _proto.renderBin = function renderBin(bin) {
          var _bin$category;
          bin.node.destroyAllChildren();
          this.makeSprite(bin.node, "bin_" + ((_bin$category = bin.category) != null ? _bin$category : 'empty'), 0, 0, bin.width, bin.height);
          if (!bin.category) {
            this.makeLabel(bin.node, 'All tidied', 0, -2, bin.width - 32, 39, 24, INK, true);
          } else {
            var cat = bin.category;
            this.drawCategoryIcon(bin.node, cat, -62, -2);
            this.makeLabel(bin.node, CATEGORY_NAME[cat], 26, 11, bin.width - 84, 30, 26, INK, true);
            this.makeLabel(bin.node, this.collected[cat] + " / " + this.total[cat], 26, -19, bin.width - 84, 28, 20, INK, true);
          }
          bin.highlight = this.makeNode(bin.node, 'Tray highlight');
          var border = bin.highlight.addComponent(Graphics);
          border.strokeColor = new Color('#FFF1B5');
          border.lineWidth = 3;
          border.roundRect(-bin.width / 2 + 8, -bin.height / 2 + 8, bin.width - 16, bin.height - 16, 21);
          border.stroke();
          bin.highlight.active = false;
        };
        _proto.drawCategoryIcon = function drawCategoryIcon(parent, category, x, y) {
          var node = this.makeNode(parent, category + " icon");
          node.setPosition(x, y);
          var icon = node.addComponent(Graphics);
          icon.strokeColor = INK;
          icon.fillColor = INK;
          icon.lineWidth = 2.5;
          switch (category) {
            case 'toys':
              icon.circle(-12, 11, 5);
              icon.circle(12, 11, 5);
              icon.stroke();
              icon.roundRect(-13, -12, 26, 25, 10);
              icon.stroke();
              icon.circle(-5, 2, 1.4);
              icon.circle(5, 2, 1.4);
              icon.ellipse(0, -4, 2.5, 1.6);
              icon.fill();
              break;
            case 'books':
              icon.moveTo(0, 8);
              icon.quadraticCurveTo(-8, 15, -17, 10);
              icon.lineTo(-17, -10);
              icon.quadraticCurveTo(-8, -6, 0, -13);
              icon.quadraticCurveTo(8, -6, 17, -10);
              icon.lineTo(17, 10);
              icon.quadraticCurveTo(8, 15, 0, 8);
              icon.lineTo(0, -13);
              icon.stroke();
              break;
            case 'clothes':
              icon.moveTo(-7, 13);
              icon.lineTo(-18, 8);
              icon.lineTo(-13, -1);
              icon.lineTo(-9, 2);
              icon.lineTo(-9, -13);
              icon.lineTo(9, -13);
              icon.lineTo(9, 2);
              icon.lineTo(13, -1);
              icon.lineTo(18, 8);
              icon.lineTo(7, 13);
              icon.quadraticCurveTo(0, 1, -7, 13);
              icon.stroke();
              break;
            case 'sports':
              icon.circle(0, 0, 14);
              icon.stroke();
              icon.moveTo(-12, 7);
              icon.quadraticCurveTo(3, 8, 7, -12);
              icon.moveTo(-13, -6);
              icon.quadraticCurveTo(3, -8, 12, 7);
              icon.stroke();
              break;
          }
        };
        _proto.beginRoomTouch = function beginRoomTouch(e) {
          var id = e.getID();
          if (id === null || this.busy || this.overlay || this.roomTouch || !this.room) return;
          this.roomVelocity = 0;
          var start = this.localPoint(e);
          this.roomTouch = {
            id: id,
            start: start,
            originX: this.room.position.x,
            swiping: false,
            samples: [{
              x: start.x,
              time: performance.now()
            }]
          };
        };
        _proto.moveRoomTouch = function moveRoomTouch(e) {
          var touch = this.roomTouch;
          if (!touch || touch.id !== e.getID()) return;
          var point = this.localPoint(e);
          var now = performance.now();
          touch.samples = touch.samples.filter(function (sample) {
            return now - sample.time <= SWIPE_SAMPLE_MS;
          });
          touch.samples.push({
            x: point.x,
            time: now
          });
          var dx = point.x - touch.start.x;
          var dy = point.y - touch.start.y;
          if (!touch.swiping && dx * dx + dy * dy < SWIPE_THRESHOLD * SWIPE_THRESHOLD) return;
          touch.swiping = true;
          this.panRoom(touch.originX + dx);
        };
        _proto.endRoomTouch = function endRoomTouch(e) {
          var touch = this.roomTouch;
          if (!touch || touch.id !== e.getID()) return;
          var point = this.localPoint(e);
          var latest = touch.samples[touch.samples.length - 1];
          if (!touch.swiping || Math.abs(point.x - latest.x) >= 0.5) this.moveRoomTouch(e);
          this.roomTouch = null;
          if (touch.swiping) {
            var first = touch.samples[0];
            var last = touch.samples[touch.samples.length - 1];
            var elapsed = (last.time - first.time) / 1000;
            if (elapsed >= 0.012 && performance.now() - last.time < SWIPE_RELEASE_MS) {
              var speed = (last.x - first.x) / elapsed;
              this.roomVelocity = Math.max(-MAX_ROOM_SPEED, Math.min(MAX_ROOM_SPEED, speed));
            }
            return;
          }
          if (Math.abs(point.x) > W / 2 || Math.abs(point.y - ROOM_VIEW_Y) > ROOM_VIEW_H / 2) return;
          var item = this.itemAt(e);
          if (item) this.collectItem(item);
        };
        _proto.cancelRoomTouch = function cancelRoomTouch(e) {
          var _this$roomTouch;
          if (((_this$roomTouch = this.roomTouch) == null ? void 0 : _this$roomTouch.id) === e.getID()) this.roomTouch = null;
        };
        _proto.advanceRoom = function advanceRoom(dt) {
          if (!this.room || Math.abs(this.roomVelocity) < MIN_ROOM_SPEED) return;
          var decay = Math.exp(-ROOM_FRICTION * Math.min(dt, 0.05));
          var target = this.room.position.x + this.roomVelocity * (1 - decay) / ROOM_FRICTION;
          this.roomVelocity *= decay;
          if (this.panRoom(target) !== target) this.roomVelocity = 0;
        };
        _proto.panRoom = function panRoom(x) {
          var limitX = (this.roomWidth - W) / 2;
          var position = Math.max(-limitX, Math.min(limitX, x));
          this.room.setPosition(position, 0);
          this.updateRoomPosition();
          return position;
        };
        _proto.updateRoomPosition = function updateRoomPosition() {
          if (!this.roomPosition) return;
          var travel = this.roomWidth - W;
          var fraction = 0.5 - this.room.position.x / travel;
          var graphics = this.roomPosition;
          graphics.clear();
          graphics.fillColor = new Color(72, 43, 26, 115);
          graphics.roundRect(-58, -3, 116, 6, 3);
          graphics.fill();
          graphics.fillColor = new Color('#FAE6C8');
          graphics.roundRect(-58 + 78 * fraction, -3, 38, 6, 3);
          graphics.fill();
        };
        _proto.itemAt = function itemAt(e) {
          var screen = e.getUILocation();
          var world = new Vec3(screen.x, screen.y, 0);
          for (var i = this.itemViews.length - 1; i >= 0; i--) {
            var item = this.itemViews[i];
            if (!item.node.isValid) continue;
            var transform = item.node.getComponent(UITransform);
            var point = transform.convertToNodeSpaceAR(world);
            if (item.kind === 'ball') {
              var x = point.x / (item.visibleWidth / 2 + 3);
              var y = point.y / (item.visibleHeight / 2 + 3);
              if (x * x + y * y <= 1) return item;
            } else if (Math.abs(point.x) <= item.visibleWidth / 2 + 3 && point.y >= -3 && point.y <= item.visibleHeight + 3) {
              return item;
            }
          }
          return null;
        };
        _proto.collectItem = function collectItem(view) {
          var _view$contactShadow,
            _this7 = this;
          if (view.index !== this.piles[view.pile].length - 1) {
            this.wiggleBlockedItem(view);
            return;
          }
          var category = ITEM_CATEGORY[view.kind];
          var bin = this.bins.find(function (b) {
            return b.category === category;
          });
          if (!bin) {
            this.returnFromTrays(view);
            return;
          }
          this.hideStatus();
          Tween.stopAllByTarget(view.node);
          (_view$contactShadow = view.contactShadow) == null || _view$contactShadow.destroy();
          view.node.setParent(this.levelRoot, true);
          bin.highlight.active = true;
          this.busy = true;
          tween(view.node).to(0.2, {
            position: new Vec3(bin.x, bin.y + 6, 0),
            scale: new Vec3(0.2, 0.2, 1)
          }).call(function () {
            var _this7$audio;
            _this7.itemViews.splice(_this7.itemViews.indexOf(view), 1);
            view.node.destroy();
            _this7.piles[view.pile].pop();
            _this7.remaining[category]--;
            _this7.collected[category]++;
            _this7.renderBin(bin);
            _this7.updateProgress();
            _this7.collectFeedback(bin);
            (_this7$audio = _this7.audio) == null || _this7$audio.play('collect');
            var revealed = _this7.itemViews.find(function (v) {
              return v.pile === view.pile && v.index === _this7.piles[view.pile].length - 1 && v.node.isValid;
            });
            if (revealed) {
              Tween.stopAllByTarget(revealed.node);
              revealed.node.setScale(0.93, 0.93);
              tween(revealed.node).to(0.17, {
                scale: new Vec3(1.06, 1.06, 1)
              }).to(0.13, {
                scale: new Vec3(1, 1, 1)
              }).start();
            }
            if (_this7.allClear()) {
              _this7.busy = false;
              _this7.showWin();
              return;
            }
            if (_this7.remaining[category] === 0) {
              _this7.finishBin(bin);
            } else {
              _this7.busy = false;
            }
          }).start();
        };
        _proto.wiggleBlockedItem = function wiggleBlockedItem(item) {
          var _this$audio3,
            _this8 = this;
          this.hideStatus();
          (_this$audio3 = this.audio) == null || _this$audio3.play('blocked');
          Tween.stopAllByTarget(item.node);
          item.node.setPosition(item.home);
          item.node.setScale(1, 1);
          this.busy = true;
          tween(item.node).to(0.06, {
            angle: item.homeAngle - 6
          }).to(0.08, {
            angle: item.homeAngle + 5
          }).to(0.08, {
            angle: item.homeAngle
          }).call(function () {
            _this8.busy = false;
          }).start();
        };
        _proto.returnFromTrays = function returnFromTrays(item) {
          var _this9 = this;
          this.hideStatus();
          var node = item.node;
          Tween.stopAllByTarget(node);
          node.setPosition(item.home);
          node.setScale(1, 1);
          node.angle = item.homeAngle;
          var parent = node.parent;
          var sibling = node.getSiblingIndex();
          node.setParent(this.levelRoot, true);
          var landing = node.position.clone();
          var tray = this.bins.reduce(function (nearest, bin) {
            return Math.abs(bin.x - landing.x) < Math.abs(nearest.x - landing.x) ? bin : nearest;
          });
          this.busy = true;
          tween(node).to(0.29, {
            position: new Vec3(tray.x, ROOM_TOP - 12, 0),
            scale: new Vec3(0.82, 0.82, 1),
            angle: item.homeAngle - 8
          }, {
            easing: 'cubicOut'
          }).call(function () {
            var _this9$audio;
            return (_this9$audio = _this9.audio) == null ? void 0 : _this9$audio.play('blocked');
          }).to(0.10, {
            angle: item.homeAngle + 8
          }, {
            easing: 'sineInOut'
          }).to(0.27, {
            position: landing,
            scale: new Vec3(1, 1, 1),
            angle: item.homeAngle
          }, {
            easing: 'quadIn'
          }).call(function () {
            node.setParent(parent);
            node.setSiblingIndex(sibling);
            node.setPosition(item.home);
            if (item.kind === 'ball') _this9.bounceBall(item);else _this9.busy = false;
          }).start();
        };
        _proto.bounceBall = function bounceBall(item) {
          var _this10 = this;
          var rise = Math.min(22, item.visibleHeight * 0.32);
          // Alternate the short roll about the original anchor so retries stay on the same surface.
          var roll = item.rollOffset === 0 ? 10 : -item.rollOffset;
          var rolled = new Vec3(item.home.x + roll, item.home.y, item.home.z);
          var angle = item.homeAngle - 2 * roll / item.visibleWidth * 180 / Math.PI;
          tween(item.node).to(0.11, {
            position: new Vec3(item.home.x, item.home.y + rise, 0)
          }, {
            easing: 'quadOut'
          }).to(0.13, {
            position: item.home
          }, {
            easing: 'quadIn'
          }).to(0.07, {
            position: new Vec3(item.home.x, item.home.y + rise * 0.3, 0)
          }, {
            easing: 'quadOut'
          }).to(0.08, {
            position: item.home
          }, {
            easing: 'quadIn'
          }).call(function () {
            var shadow = item.contactShadow;
            if (shadow) {
              tween(shadow).to(0.2, {
                position: new Vec3(shadow.position.x + roll, shadow.position.y, shadow.position.z)
              }, {
                easing: 'cubicOut'
              }).start();
            }
          }).to(0.2, {
            position: rolled,
            angle: angle
          }, {
            easing: 'cubicOut'
          }).call(function () {
            item.home.set(rolled);
            item.homeAngle = angle;
            item.rollOffset += roll;
            _this10.busy = false;
          }).start();
        };
        _proto.finishBin = function finishBin(bin) {
          var candidates = this.availableCategories();
          if (!candidates.length) {
            bin.category = null;
            this.renderBin(bin);
            this.busy = false;
            return;
          }
          if (this.level.mode === 'auto') {
            var _this$audio4;
            var next = candidates[0];
            bin.category = next;
            this.renderBin(bin);
            this.busy = false;
            (_this$audio4 = this.audio) == null || _this$audio4.play('change_box');
            this.setStatus(CATEGORY_NAME[next] + " box is ready!");
          } else {
            this.showChoice(bin, candidates);
          }
        };
        _proto.availableCategories = function availableCategories() {
          var _this11 = this;
          var order = ['toys', 'books', 'clothes', 'sports'];
          return order.filter(function (c) {
            return _this11.remaining[c] > 0 && !_this11.bins.some(function (b) {
              return b.category === c;
            });
          });
        };
        _proto.showChoice = function showChoice(bin, candidates) {
          var _this12 = this;
          this.overlay = this.makeNode(this.node, 'Choose next box');
          this.overlay.addComponent(UITransform).setContentSize(W, H);
          this.overlay.addComponent(BlockInputEvents);
          this.makePanel(this.overlay, 'Dim', 0, 0, W, H, new Color(44, 36, 30, 160), 0);
          this.makePanel(this.overlay, 'Card', 0, 12, 600, 400, new Color('#FFF8EC'), 32);
          this.makeLabel(this.overlay, 'Choose the next box', 0, 145, 540, 65, 35, INK, true);
          this.makeLabel(this.overlay, 'Which category will you clear next?', 0, 86, 540, 50, 23, new Color('#817063'));
          var width = 235;
          var gap = 20;
          candidates.forEach(function (category, i) {
            var x = (i - (candidates.length - 1) / 2) * (width + gap);
            var button = _this12.makeSprite(_this12.overlay, "bin_" + category, x, -35, width, 110);
            _this12.drawCategoryIcon(button, category, -65, 1);
            _this12.makeLabel(button, CATEGORY_NAME[category], 26, 11, width - 80, 34, 27, INK, true);
            _this12.makeLabel(button, _this12.remaining[category] + " items", 26, -20, width - 80, 28, 21, INK);
            button.on(Node.EventType.TOUCH_END, function () {
              var _this12$overlay, _this12$audio;
              bin.category = category;
              _this12.renderBin(bin);
              (_this12$overlay = _this12.overlay) == null || _this12$overlay.destroy();
              _this12.overlay = null;
              _this12.busy = false;
              (_this12$audio = _this12.audio) == null || _this12$audio.play('change_box');
              _this12.setStatus(CATEGORY_NAME[category] + " box is ready!");
            }, _this12);
          });
        };
        _proto.showWin = function showWin() {
          var _this$audio5,
            _this13 = this;
          (_this$audio5 = this.audio) == null || _this$audio5.play('win');
          this.overlay = this.makeNode(this.node, 'Level complete');
          this.overlay.addComponent(UITransform).setContentSize(W, H);
          this.overlay.addComponent(BlockInputEvents);
          this.makePanel(this.overlay, 'Dim', 0, 0, W, H, new Color(44, 36, 30, 164), 0);
          this.makePanel(this.overlay, 'Card shadow', 0, -10, 596, 480, new Color('#B7996F'), 34);
          this.makePanel(this.overlay, 'Card', 0, 0, 596, 480, new Color('#FFF8EC'), 34);
          var art = this.makeNode(this.overlay, 'Completion stars').addComponent(Graphics);
          for (var i = 0; i < 3; i++) this.drawStar(art, (i - 1) * 76, 157, i === 1 ? 37 : 27);
          this.makeLabel(this.overlay, 'ROOM TIDIED!', 0, 70, 560, 72, 42, INK, true);
          var count = Object.keys(this.total).reduce(function (n, key) {
            return n + _this13.total[key];
          }, 0);
          this.makeLabel(this.overlay, count + " items back where they belong.", 0, 0, 530, 54, 25, new Color('#827267'));
          this.makeLabel(this.overlay, this.shownHint ? 'A little help. A lovely tidy room.' : 'Beautifully done — all on your own!', 0, -54, 530, 36, 20, new Color('#9A805F'));
          var last = this.levelIndex === LEVELS.length - 1;
          var button = this.makeSprite(this.overlay, 'find', 0, -150, 344, 76);
          this.makeLabel(button, last ? 'Play Again' : 'Next Room', 0, 0, 300, 56, 28, INK, true);
          button.on(Node.EventType.TOUCH_END, function () {
            return _this13.loadLevel(_this13.levelIndex + 1);
          }, this);
        };
        _proto.allClear = function allClear() {
          return this.piles.every(function (p) {
            return p.length === 0;
          });
        };
        _proto.clearDynamicNodes = function clearDynamicNodes() {
          // The Camera belongs to the serialized Canvas and must survive restarts.
          var stop = function stop(node) {
            Tween.stopAllByTarget(node);
            node.children.forEach(stop);
          };
          for (var _i3 = 0, _arr2 = [].concat(this.node.children); _i3 < _arr2.length; _i3++) {
            var _this$audio6;
            var child = _arr2[_i3];
            if (child.name !== 'Camera' && child.name !== 'RoomBackdrop' && child !== ((_this$audio6 = this.audio) == null ? void 0 : _this$audio6.node)) {
              stop(child);
              child.destroy();
            }
          }
        };
        _proto.updateProgress = function updateProgress() {
          var _this14 = this;
          var total = Object.keys(this.total).reduce(function (n, c) {
            return n + _this14.total[c];
          }, 0);
          var done = Object.keys(this.collected).reduce(function (n, c) {
            return n + _this14.collected[c];
          }, 0);
          if (this.progressText) this.progressText.string = done + " / " + total;
          if (!this.progressBar) return;
          this.progressBar.clear();
          if (done) {
            var width = PROGRESS_WIDTH * done / total;
            this.progressBar.fillColor = new Color('#9AA473');
            this.progressBar.roundRect(0, -10, width, 20, Math.min(10, width / 2));
            this.progressBar.fill();
          }
        };
        _proto.showHint = function showHint() {
          var _this15 = this,
            _candidates$find,
            _this$audio7;
          if (this.busy || this.roomTouch || this.overlay) return;
          this.roomVelocity = 0;
          var roomX = this.room.position.x;
          var candidates = this.itemViews.filter(function (v) {
            return v.node.isValid && v.index === _this15.piles[v.pile].length - 1 && _this15.bins.some(function (b) {
              return b.category === ITEM_CATEGORY[v.kind];
            });
          });
          var next = (_candidates$find = candidates.find(function (item) {
            return Math.abs(item.home.x + roomX) + item.visibleWidth / 2 <= W / 2 - 18;
          })) != null ? _candidates$find : candidates[0];
          if (!next) return;
          this.shownHint = true;
          (_this$audio7 = this.audio) == null || _this$audio7.play('hint');
          if (Math.abs(next.home.x + roomX) + next.visibleWidth / 2 > W / 2 - 18) {
            this.panRoom(-next.home.x);
          }
          Tween.stopAllByTarget(next.node);
          next.node.setPosition(next.home);
          next.node.setScale(1, 1);
          tween(next.node).to(0.22, {
            position: new Vec3(next.home.x, next.home.y + 18, 0),
            scale: new Vec3(1.14, 1.14, 1)
          }).to(0.2, {
            position: next.home,
            scale: new Vec3(1, 1, 1)
          }).union().repeat(2).start();
          this.setStatus("Try this item \u2014 it belongs in " + CATEGORY_NAME[ITEM_CATEGORY[next.kind]] + ".");
        };
        _proto.collectFeedback = function collectFeedback(bin) {
          Tween.stopAllByTarget(bin.node);
          bin.node.setScale(1, 1);
          tween(bin.node).to(0.1, {
            scale: new Vec3(1.025, 1.025, 1)
          }).to(0.14, {
            scale: new Vec3(1, 1, 1)
          }).start();
        };
        _proto.drawStar = function drawStar(graphics, x, y, radius) {
          graphics.fillColor = new Color('#EAB65D');
          for (var i = 0; i < 10; i++) {
            var a = Math.PI / 2 + i * Math.PI / 5;
            var r = i % 2 ? radius * 0.47 : radius;
            var px = x + Math.cos(a) * r,
              py = y + Math.sin(a) * r;
            if (i === 0) graphics.moveTo(px, py);else graphics.lineTo(px, py);
          }
          graphics.close();
          graphics.fill();
        };
        _proto.makeSprite = function makeSprite(parent, art, x, y, width, height) {
          var node = this.makeNode(parent, art);
          node.setPosition(x, y);
          var trans = node.addComponent(UITransform);
          var sprite = node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var frame = this.frames.get(art);
          sprite.spriteFrame = frame;
          sprite.trim = false;
          var source = frame.originalSize;
          trans.setContentSize(width, height != null ? height : width * source.height / source.width);
          return node;
        };
        _proto.setStatus = function setStatus(message) {
          if (!this.status) return;
          var panel = this.status.node.parent;
          Tween.stopAllByTarget(panel);
          this.status.string = message;
          panel.active = true;
          tween(panel).delay(2.4).call(function () {
            panel.active = false;
          }).start();
        };
        _proto.hideStatus = function hideStatus() {
          var _this$status;
          var panel = (_this$status = this.status) == null ? void 0 : _this$status.node.parent;
          if (!panel) return;
          Tween.stopAllByTarget(panel);
          panel.active = false;
        };
        _proto.localPoint = function localPoint(e) {
          var p = e.getUILocation();
          var q = this.node.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(p.x, p.y, 0));
          return new Vec2(q.x, q.y);
        };
        _proto.makeNode = function makeNode(parent, name) {
          var node = new Node(name);
          node.layer = Layers.Enum.UI_2D;
          parent.addChild(node);
          return node;
        };
        _proto.makePanel = function makePanel(parent, name, x, y, width, height, fill, radius) {
          var node = this.makeNode(parent, name);
          node.setPosition(x, y);
          node.addComponent(UITransform).setContentSize(width, height);
          var graphics = node.addComponent(Graphics);
          graphics.fillColor = fill;
          if (radius) graphics.roundRect(-width / 2, -height / 2, width, height, radius);else graphics.rect(-width / 2, -height / 2, width, height);
          graphics.fill();
          return node;
        };
        _proto.makeLabel = function makeLabel(parent, value, x, y, width, height, fontSize, color, bold) {
          if (bold === void 0) {
            bold = false;
          }
          var node = this.makeNode(parent, "Text: " + value);
          node.setPosition(x, y);
          node.addComponent(UITransform).setContentSize(width, height);
          var label = node.addComponent(Label);
          label.string = value;
          label.fontFamily = "Georgia, serif";
          label.fontSize = fontSize;
          label.lineHeight = Math.round(fontSize * 1.2);
          label.color = color;
          label.isBold = bold;
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.SHRINK;
          return label;
        };
        return DailyTidyRoot;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DailyTidyWeather.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, Graphics, Node;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Graphics = module.Graphics;
      Node = module.Node;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6bbdeI6NLlLP6gdqIAPl2Kt", "DailyTidyWeather", undefined);
      var WEATHER_STATES = exports('WEATHER_STATES', ['sunny', 'rain', 'snow']);
      var WEATHER_LABEL = exports('WEATHER_LABEL', {
        sunny: 'Sunny',
        rain: 'Rain',
        snow: 'Snow'
      });
      var WEATHER_LIGHT = exports('WEATHER_LIGHT', {
        sunny: new Color('#FFFFFF'),
        rain: new Color('#CBD4DF'),
        snow: new Color('#E2ECF5')
      });
      // Visible glass on attic.jpg, in a 2× crop with origin at artwork pixel (155, 80).
      // Each quad follows the glass edges where the curtains cover the frame.
      var PANES = [[[167, 48], [205, 48], [205, 183], [134, 183]], [[228, 48], [346, 49], [349, 185], [228, 185]], [[413, 51], [529, 51], [529, 185], [413, 185]], [[554, 51], [640, 52], [666, 185], [554, 185]], [[125, 206], [205, 206], [205, 334], [92, 334]], [[229, 206], [347, 206], [349, 334], [229, 334]], [[414, 208], [530, 208], [530, 334], [414, 334]], [[555, 208], [673, 208], [675, 334], [555, 334]], [[93, 359], [206, 359], [206, 500], [92, 500]], [[230, 359], [348, 359], [349, 500], [230, 500]], [[415, 359], [530, 359], [530, 500], [414, 500]], [[555, 359], [674, 359], [676, 500], [555, 500]]];
      var RAIN_GLASS = new Color(101, 129, 149, 119);
      var SNOW_GLASS = new Color(230, 240, 243, 142);
      var RAIN = new Color(218, 237, 247, 169);
      var SNOW = new Color(255, 253, 244, 232);
      var BIRD = new Color(83, 83, 67, 169);
      function point(pane, u, v) {
        var tl = pane[0],
          tr = pane[1],
          br = pane[2],
          bl = pane[3];
        return [(tl[0] + (tr[0] - tl[0]) * u) * (1 - v) + (bl[0] + (br[0] - bl[0]) * u) * v, (tl[1] + (tr[1] - tl[1]) * u) * (1 - v) + (bl[1] + (br[1] - bl[1]) * u) * v];
      }
      var DailyTidyWeather = exports('DailyTidyWeather', /*#__PURE__*/function () {
        function DailyTidyWeather(node) {
          this.glass = void 0;
          this.particles = void 0;
          this.weather = 'sunny';
          this.time = 0;
          this.frameTime = 0;
          this.node = node;
          this.glass = node.addComponent(Graphics);
          var animation = new Node('Window particles');
          animation.layer = node.layer;
          node.addChild(animation);
          this.particles = animation.addComponent(Graphics);
        }
        var _proto = DailyTidyWeather.prototype;
        _proto.setWeather = function setWeather(weather) {
          this.weather = weather;
          this.time = 0;
          this.frameTime = 0;
          this.glass.clear();
          if (weather !== 'sunny') {
            this.glass.fillColor = weather === 'rain' ? RAIN_GLASS : SNOW_GLASS;
            for (var _i = 0, _PANES = PANES; _i < _PANES.length; _i++) {
              var pane = _PANES[_i];
              this.glass.moveTo(pane[0][0], -pane[0][1]);
              for (var _iterator = _createForOfIteratorHelperLoose(pane.slice(1)), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                  x = _step$value[0],
                  y = _step$value[1];
                this.glass.lineTo(x, -y);
              }
              this.glass.close();
            }
            this.glass.fill();
            if (weather === 'snow') this.drawSnowDrifts();
          }
          this.drawParticles();
        };
        _proto.update = function update(dt) {
          this.time += dt;
          this.frameTime += dt;
          if (this.frameTime < 1 / 30) return;
          this.frameTime = 0;
          this.drawParticles();
        };
        _proto.drawSnowDrifts = function drawSnowDrifts() {
          this.glass.fillColor = new Color(247, 249, 242, 229);
          for (var _iterator2 = _createForOfIteratorHelperLoose(PANES.slice(8)), _step2; !(_step2 = _iterator2()).done;) {
            var pane = _step2.value;
            var _point = point(pane, 0, 0.94),
              x = _point[0],
              y = _point[1];
            this.glass.moveTo(x, -y);
            for (var _i2 = 0, _arr = [[0.22, 0.91], [0.45, 0.95], [0.73, 0.92], [1, 0.93], [1, 1], [0, 1]]; _i2 < _arr.length; _i2++) {
              var _arr$_i = _arr[_i2],
                u = _arr$_i[0],
                v = _arr$_i[1];
              var _point2 = point(pane, u, v),
                px = _point2[0],
                py = _point2[1];
              this.glass.lineTo(px, -py);
            }
            this.glass.close();
          }
          this.glass.fill();
        };
        _proto.drawParticles = function drawParticles() {
          var _this = this;
          var g = this.particles;
          g.clear();
          if (this.weather === 'sunny') {
            // The birds pass behind the center glass for a moment every few seconds.
            var cycle = this.time % 9;
            if (cycle > 1.3) return;
            g.strokeColor = BIRD;
            g.lineWidth = 1.7;
            for (var i = 0; i < 2; i++) {
              var _point3 = point(PANES[2], 0.09 + cycle * 0.49 + i * 0.16, 0.32 + i * 0.13),
                x = _point3[0],
                y = _point3[1];
              var flap = 2 + Math.sin(this.time * 19 + i) * 2;
              g.moveTo(x - 5, -y + flap);
              g.quadraticCurveTo(x - 2, -y + 4, x, -y);
              g.quadraticCurveTo(x + 3, -y + 4, x + 5, -y + flap);
            }
            g.stroke();
            return;
          }
          var raining = this.weather === 'rain';
          g.strokeColor = RAIN;
          g.fillColor = SNOW;
          g.lineWidth = 1.45;
          PANES.forEach(function (pane, index) {
            var count = raining ? 8 : 6;
            for (var _i3 = 0; _i3 < count; _i3++) {
              var speed = raining ? 1.7 + _i3 * 0.13 : 0.23 + _i3 * 0.018;
              var v = (index * 0.071 + _i3 * 0.147 + _this.time * speed) % 1;
              var drift = raining ? -v * 0.14 : Math.sin(_this.time * 1.2 + _i3) * 0.065;
              var u = 0.21 + _i3 * 0.085 + index % 3 * 0.02 + drift;
              var _point4 = point(pane, u, 0.025 + v * (raining ? 0.83 : 0.94)),
                _x = _point4[0],
                _y = _point4[1];
              if (raining) {
                var _point5 = point(pane, u - 0.035, 0.1 + v * 0.83),
                  endX = _point5[0],
                  endY = _point5[1];
                g.moveTo(_x, -_y);
                g.lineTo(endX, -endY);
              } else {
                g.circle(_x, -_y, 1.7 + _i3 % 3 * 0.6);
              }
            }
          });
          if (raining) g.stroke();else g.fill();
        };
        return DailyTidyWeather;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelData.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, cclegacy;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dc61d/QGKJOPInhhLHoHZQB", "LevelData", undefined);
      var ITEM_CATEGORY = exports('ITEM_CATEGORY', {
        teddy: 'toys',
        car: 'toys',
        train: 'toys',
        blue_book: 'books',
        red_book: 'books',
        green_book: 'books',
        shirt: 'clothes',
        hat: 'clothes',
        ball: 'sports'
      });
      var CATEGORY_NAME = exports('CATEGORY_NAME', {
        toys: 'Toys',
        books: 'Books',
        clothes: 'Clothes',
        sports: 'Sports'
      });

      // Coordinates follow the furniture surfaces in the artwork. Shelves use
      // shallower, smaller arrangements than the sofa and the foreground rugs.
      var SURFACES = {
        sideTable: {
          x: 108,
          y: 475,
          width: 71,
          angle: -7
        },
        windowSill: {
          x: 390,
          y: 362,
          width: 74,
          angle: 3,
          stackOffset: 0.22
        },
        windowLeft: {
          x: 227,
          y: 368,
          width: 64,
          angle: -1
        },
        sofaLeft: {
          x: 343,
          y: 546,
          width: 96,
          angle: 3,
          stackOffset: -0.22
        },
        sofaRight: {
          x: 527,
          y: 529,
          width: 97,
          angle: -4
        },
        sofaFoot: {
          x: 652,
          y: 686,
          width: 78,
          angle: 1
        },
        leftRugBack: {
          x: 535,
          y: 713,
          width: 85,
          angle: 4
        },
        leftRugFront: {
          x: 250,
          y: 749,
          width: 110,
          angle: -4,
          stackOffset: 0.24
        },
        leftRugEdge: {
          x: 120,
          y: 765,
          width: 76,
          angle: 1
        },
        leftRugBall: {
          x: 535,
          y: 748,
          width: 85,
          angle: 4
        },
        shelfHigh: {
          x: 786,
          y: 185,
          width: 75,
          angle: 2
        },
        shelfMiddle: {
          x: 691,
          y: 279,
          width: 68,
          angle: -2,
          stackOffset: 0.23
        },
        shelfLow: {
          x: 758,
          y: 362,
          width: 74,
          angle: 2
        },
        deskCorner: {
          x: 879,
          y: 375,
          width: 83,
          angle: -4,
          stackOffset: 0.19
        },
        stool: {
          x: 769,
          y: 566,
          width: 88,
          angle: -3,
          stackOffset: -0.22
        },
        deskFloor: {
          x: 1124,
          y: 640,
          width: 81,
          angle: 2
        },
        deskRugEdge: {
          x: 1061,
          y: 722,
          width: 81,
          angle: 2
        },
        deskShelf: {
          x: 1245,
          y: 219,
          width: 74,
          angle: 1,
          stackOffset: -0.22
        },
        readerShelfMid: {
          x: 1305,
          y: 305,
          width: 72,
          angle: 2,
          stackOffset: -0.20
        },
        readerShelfLow: {
          x: 1262,
          y: 391,
          width: 60,
          angle: -2
        },
        readerSeat: {
          x: 1393,
          y: 527,
          width: 100,
          angle: 3,
          stackOffset: 0.22
        },
        cabinetLeft: {
          x: 1663,
          y: 427,
          width: 87,
          angle: -3,
          stackOffset: -0.22
        },
        cabinetRight: {
          x: 1784,
          y: 442,
          width: 76,
          angle: 4
        },
        rightRugFront: {
          x: 1322,
          y: 752,
          width: 112,
          angle: 4,
          stackOffset: -0.24
        },
        rightRugBack: {
          x: 1554,
          y: 702,
          width: 90,
          angle: -2
        },
        rightFloor: {
          x: 1755,
          y: 679,
          width: 82,
          angle: 2
        },
        rightRugEdge: {
          x: 1705,
          y: 757,
          width: 82,
          angle: 2
        }
      };
      function pile(surface) {
        for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          items[_key - 1] = arguments[_key];
        }
        return _extends({}, SURFACES[surface], {
          items: items
        });
      }
      var LEVELS = exports('LEVELS', [{
        title: 'The Living Room',
        mode: 'auto',
        active: ['toys', 'books', 'clothes'],
        piles: [
        // 8 at the window and sofa.
        pile('sideTable', 'blue_book'), pile('windowSill', 'car'), pile('sofaLeft', 'red_book'), pile('sofaRight', 'shirt'), pile('sofaFoot', 'teddy'), pile('leftRugBack', 'hat'), pile('leftRugFront', 'green_book', 'blue_book'),
        // 7 around the shelves and desk.
        pile('shelfHigh', 'green_book'), pile('shelfLow', 'car'), pile('deskCorner', 'shirt', 'red_book'), pile('stool', 'shirt', 'hat'), pile('deskFloor', 'train'),
        // 7 in the reading corner.
        pile('readerShelfLow', 'teddy'), pile('readerSeat', 'shirt'), pile('cabinetLeft', 'hat'), pile('rightRugFront', 'red_book', 'blue_book'), pile('rightRugBack', 'train'), pile('rightFloor', 'car')]
      }, {
        title: 'A Busy Afternoon',
        mode: 'auto',
        active: ['toys', 'books', 'clothes'],
        piles: [pile('sideTable', 'blue_book'), pile('windowSill', 'red_book', 'green_book'), pile('sofaLeft', 'teddy'), pile('sofaRight', 'shirt'), pile('sofaFoot', 'car'), pile('leftRugBack', 'hat'), pile('leftRugFront', 'red_book', 'shirt'), pile('leftRugEdge', 'ball'), pile('shelfHigh', 'green_book'), pile('shelfMiddle', 'blue_book', 'red_book'), pile('shelfLow', 'train'), pile('deskCorner', 'red_book', 'hat'), pile('stool', 'shirt', 'hat'), pile('deskRugEdge', 'ball'), pile('readerShelfMid', 'blue_book'), pile('readerSeat', 'shirt', 'green_book'), pile('cabinetLeft', 'blue_book', 'hat'), pile('cabinetRight', 'car'), pile('rightRugFront', 'ball'), pile('rightRugBack', 'train'), pile('rightRugEdge', 'ball')]
      }, {
        title: 'Choose Your Next Box',
        mode: 'choose',
        active: ['toys', 'books'],
        piles: [pile('sideTable', 'green_book'), pile('windowSill', 'blue_book', 'red_book'), pile('windowLeft', 'hat'), pile('sofaLeft', 'shirt', 'red_book'), pile('sofaRight', 'teddy'), pile('sofaFoot', 'train'), pile('leftRugBall', 'ball'), pile('leftRugFront', 'green_book', 'shirt'), pile('shelfHigh', 'blue_book'), pile('shelfMiddle', 'red_book', 'hat'), pile('shelfLow', 'car'), pile('deskCorner', 'blue_book', 'green_book'), pile('stool', 'shirt', 'hat'), pile('deskRugEdge', 'ball'), pile('deskShelf', 'red_book'), pile('readerShelfMid', 'green_book', 'shirt'), pile('readerShelfLow', 'teddy'), pile('readerSeat', 'shirt'), pile('cabinetLeft', 'blue_book', 'hat'), pile('cabinetRight', 'car'), pile('rightRugFront', 'ball'), pile('rightRugBack', 'train'), pile('rightRugEdge', 'ball')]
      }]);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './DailyTidyAudio.ts', './DailyTidyRoot.ts', './DailyTidyWeather.ts', './LevelData.ts'], function () {
  return {
    setters: [null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});