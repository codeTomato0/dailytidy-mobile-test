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
      var MUSIC_VOLUME = 0.28;
      var ROOM_MUSIC = {
        attic: 'music',
        bedroom: 'music_bedroom',
        studio: 'music_studio',
        office: 'music_office',
        park: 'music_park'
      };
      var EFFECT_VOLUME = {
        hint: 0.32,
        win: 0.4,
        blocked: 0.21,
        tap_book: 0.41,
        tap_cloth: 0.46,
        tap_hat: 0.39,
        tap_teddy: 0.40,
        tap_car: 0.32,
        tap_train: 0.33,
        tap_ball: 0.36,
        tap_metal: 0.35,
        tap_wrapper: 0.37,
        drop_box: 0.39,
        box_lift: 0.37,
        box_set: 0.55,
        pinned: 0.31,
        ball_air: 0.25,
        ball_land: 0.44,
        ball_bounce: 0.31,
        ball_roll: 0.24
      };
      var ITEM_TAP_EFFECT = {
        blue_book: 'tap_book',
        red_book: 'tap_book',
        green_book: 'tap_book',
        shirt: 'tap_cloth',
        hat: 'tap_hat',
        teddy: 'tap_teddy',
        car: 'tap_car',
        train: 'tap_train',
        ball: 'tap_ball',
        pajamas: 'tap_cloth',
        slipper: 'tap_teddy',
        towel: 'tap_cloth',
        yarn: 'tap_teddy',
        ribbon: 'tap_hat',
        watercolor: 'tap_metal',
        brush: 'tap_train',
        tape: 'tap_wrapper',
        stapler: 'tap_metal',
        envelope: 'tap_book',
        parcel: 'tap_wrapper',
        folder: 'tap_book',
        apple: 'tap_ball',
        sandwich: 'tap_wrapper',
        flask: 'tap_metal',
        lantern: 'tap_metal',
        shuttlecock: 'tap_hat',
        disc: 'tap_car'
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
          this.room = null;
          this.weather = 'sunny';
          this.enabled = true;
          this.node = node;
          this.music = this.createSource('Music', MUSIC_VOLUME, true);
          this.ambience = this.createSource('Ambience', AMBIENCE_VOLUME.sunny, true);
        }
        var _proto = DailyTidyAudio.prototype;
        _proto.load = function load() {
          var _this = this;
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
        _proto.setRoom = function setRoom(room) {
          var _this2 = this;
          if (room === this.room) return;
          this.room = room;
          this.loadClip(ROOM_MUSIC[room], function (clip) {
            if (_this2.room !== room || _this2.music.clip === clip) return;
            if (_this2.music.clip) _this2.music.stop();
            _this2.music.clip = clip;
            if (_this2.enabled) _this2.music.play();
          });
        };
        _proto.setWeather = function setWeather(weather) {
          if (weather === this.weather) return;
          this.weather = weather;
          this.applyAmbience();
        };
        _proto.setEnabled = function setEnabled(enabled) {
          if (enabled === this.enabled) return;
          this.enabled = enabled;
          this.music.volume = enabled ? MUSIC_VOLUME : 0;
          this.ambience.volume = enabled ? AMBIENCE_VOLUME[this.weather] : 0;
          if (enabled) {
            if (this.music.clip && !this.music.playing) this.music.play();
            if (this.ambience.clip && !this.ambience.playing) this.ambience.play();
          } else {
            if (this.music.playing) this.music.pause();
            if (this.ambience.playing) this.ambience.pause();
            for (var _iterator2 = _createForOfIteratorHelperLoose(this.effects.values()), _step2; !(_step2 = _iterator2()).done;) {
              var source = _step2.value;
              source.stop();
            }
          }
        };
        _proto.play = function play(effect) {
          var _this$effects$get;
          if (this.enabled) (_this$effects$get = this.effects.get(effect)) == null || _this$effects$get.play();
        };
        _proto.playItemTap = function playItemTap(kind) {
          this.play(ITEM_TAP_EFFECT[kind]);
        };
        _proto.applyAmbience = function applyAmbience() {
          var _this$environment$get;
          var clip = (_this$environment$get = this.environment.get(this.weather)) != null ? _this$environment$get : null;
          if (this.ambience.clip === clip) return;
          if (this.ambience.clip) this.ambience.stop();
          this.ambience.clip = clip;
          this.ambience.volume = this.enabled ? AMBIENCE_VOLUME[this.weather] : 0;
          if (clip && this.enabled) this.ambience.play();
        };
        _proto.loadClip = function loadClip(name, ready) {
          var _this3 = this;
          resources.load("audio/storybook/" + name, AudioClip, function (error, clip) {
            if (error) {
              console.warn("Could not load Daily Tidy audio: " + name, error);
              return;
            }
            if (_this3.node.isValid) ready(clip);
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
  var _inheritsLoose, _createForOfIteratorHelperLoose, _extends, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Color, view, Camera, Layers, profiler, screen, ResolutionPolicy, Widget, UITransform, BlockInputEvents, Graphics, Mask, Node, Sprite, Vec3, Tween, tween, UIOpacity, Vec2, Label, Component, resources, SpriteFrame, LEVELS, emptyCategoryCounts, ITEM_CATEGORY, CATEGORY_NAME, DailyTidyAudio, ROOM_WINDOWS, DailyTidyWeather, WEATHER_STATES, WEATHER_LIGHT, WEATHER_LABEL;
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
      Camera = module.Camera;
      Layers = module.Layers;
      profiler = module.profiler;
      screen = module.screen;
      ResolutionPolicy = module.ResolutionPolicy;
      Widget = module.Widget;
      UITransform = module.UITransform;
      BlockInputEvents = module.BlockInputEvents;
      Graphics = module.Graphics;
      Mask = module.Mask;
      Node = module.Node;
      Sprite = module.Sprite;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      tween = module.tween;
      UIOpacity = module.UIOpacity;
      Vec2 = module.Vec2;
      Label = module.Label;
      Component = module.Component;
      resources = module.resources;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      LEVELS = module.LEVELS;
      emptyCategoryCounts = module.emptyCategoryCounts;
      ITEM_CATEGORY = module.ITEM_CATEGORY;
      CATEGORY_NAME = module.CATEGORY_NAME;
    }, function (module) {
      DailyTidyAudio = module.DailyTidyAudio;
    }, function (module) {
      ROOM_WINDOWS = module.ROOM_WINDOWS;
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
      var ROOM_TOP = 317;
      var STAGING_Y = 356;
      var ROOM_BOTTOM = -H / 2;
      var ROOM_VIEW_H = ROOM_TOP - ROOM_BOTTOM;
      var PROGRESS_WIDTH = 438;
      var HEADER_COLOR = new Color('#F7E8D4');
      var HEADER_EDGE = new Color('#D3B394');
      var UI_ASSETS = ['logo', 'restart', 'find', 'track', 'bin_toys', 'bin_books', 'bin_clothes', 'bin_sports', 'bin_empty'];
      var BIN_ART = {
        toys: 'bin_toys',
        books: 'bin_books',
        clothes: 'bin_clothes',
        sports: 'bin_sports',
        linens: 'bin_books',
        crafts: 'bin_toys',
        tools: 'bin_sports',
        mail: 'bin_clothes',
        papers: 'bin_books',
        snacks: 'bin_clothes',
        picnic: 'bin_toys'
      };
      var BIN_ICON_ITEMS = {
        linens: 'towel',
        crafts: 'yarn',
        tools: 'tape',
        mail: 'envelope',
        papers: 'folder',
        snacks: 'apple',
        picnic: 'flask'
      };
      var FLAT_ITEMS = new Set(['blue_book', 'red_book', 'green_book', 'shirt', 'pajamas', 'towel', 'disc', 'folder', 'envelope', 'sandwich']);
      var TIGHT_FOOTPRINT = {
        center: 0.5,
        bottom: 0,
        width: 1,
        height: 1
      };

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
          _this.held = [];
          _this.slots = [];
          _this.stagingCount = null;
          _this.itemViews = [];
          _this.remaining = emptyCategoryCounts();
          _this.collected = emptyCategoryCounts();
          _this.total = emptyCategoryCounts();
          _this.room = null;
          _this.roomWidth = W;
          _this.roomCenter = 0;
          _this.roomViewport = null;
          _this.roomScale = 1;
          _this.roomViewportWidth = W;
          _this.roomHeader = null;
          _this.footer = null;
          _this.overlayDim = null;
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
          _this.pendingMoves = 0;
          _this.swappingBin = null;
          _this.progressText = null;
          _this.progressBar = null;
          _this.shownHint = false;
          return _this;
        }
        var _proto = DailyTidyRoot.prototype;
        _proto.onLoad = function onLoad() {
          var _this$node$getChildBy;
          this.resizeView();
          view.on('canvas-resize', this.resizeView, this);
          var camera = (_this$node$getChildBy = this.node.getChildByName('Camera')) == null ? void 0 : _this$node$getChildBy.getComponent(Camera);
          if (camera) {
            camera.near = 1;
            camera.far = 2000;
            camera.visibility = Layers.Enum.UI_2D;
            camera.clearColor = HEADER_COLOR;
          }
          var backdrop = this.node.getChildByName('RoomBackdrop');
          if (backdrop) backdrop.active = false;
          profiler.hideStats();
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  profiler.hideStats();
                  this.audio = new DailyTidyAudio(this.makeNode(this.node, 'Daily Tidy audio'));
                  this.audio.load();
                  this.audio.setRoom(LEVELS[0].room);
                  this.showLoading();
                  _context.prev = 5;
                  _context.next = 8;
                  return Promise.all([this.loadLevelArt(0)].concat(UI_ASSETS.map(function (name) {
                    return _this2.loadFrame(name, "ui/" + name);
                  })));
                case 8:
                  if (this.node.isValid) {
                    _context.next = 10;
                    break;
                  }
                  return _context.abrupt("return");
                case 10:
                  this.loadLevel(0);
                  _context.next = 20;
                  break;
                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](5);
                  if (this.node.isValid) {
                    _context.next = 17;
                    break;
                  }
                  return _context.abrupt("return");
                case 17:
                  this.clearDynamicNodes();
                  this.makeLabel(this.node, 'Could not load art. Open the project in Cocos Creator first.', 0, 0, 540, 60, 28, INK);
                  console.error(_context.t0);
                case 20:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[5, 13]]);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.loadFrame = /*#__PURE__*/function () {
          var _loadFrame = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(name, path) {
            var frame;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (!this.frames.has(name)) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  _context2.next = 4;
                  return new Promise(function (resolve, reject) {
                    resources.load("art/storybook/" + path + "/spriteFrame", SpriteFrame, function (error, asset) {
                      return error ? reject(error) : resolve(asset);
                    });
                  });
                case 4:
                  frame = _context2.sent;
                  this.frames.set(name, frame);
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function loadFrame(_x, _x2) {
            return _loadFrame.apply(this, arguments);
          }
          return loadFrame;
        }();
        _proto.loadLevelArt = /*#__PURE__*/function () {
          var _loadLevelArt = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(index) {
            var _this3 = this;
            var level, items, _iterator, _step, stack, _iterator3, _step3, item, _iterator2, _step2, category, icon;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  level = LEVELS[index];
                  items = new Set();
                  for (_iterator = _createForOfIteratorHelperLoose(level.piles); !(_step = _iterator()).done;) {
                    stack = _step.value.items;
                    for (_iterator3 = _createForOfIteratorHelperLoose(stack); !(_step3 = _iterator3()).done;) {
                      item = _step3.value;
                      items.add(item);
                    }
                  }
                  for (_iterator2 = _createForOfIteratorHelperLoose(level.categories); !(_step2 = _iterator2()).done;) {
                    category = _step2.value;
                    icon = BIN_ICON_ITEMS[category];
                    if (icon) items.add(icon);
                  }
                  _context3.next = 6;
                  return Promise.all([this.loadFrame(level.room, level.room)].concat(Array.from(items, function (name) {
                    return _this3.loadFrame(name, "items/" + name);
                  })));
                case 6:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function loadLevelArt(_x3) {
            return _loadLevelArt.apply(this, arguments);
          }
          return loadLevelArt;
        }();
        _proto.update = function update(dt) {
          this.advanceRoom(dt);
          if (!this.weatherView || !this.room) return;
          var window = this.weatherView.node;
          var halfWidth = this.roomViewportWidth / (2 * this.roomScale);
          var windowLeft = window.position.x + this.room.position.x / this.roomScale;
          var windowRight = windowLeft + this.weatherView.width * window.scale.x;
          if (windowLeft < halfWidth && windowRight > -halfWidth) this.weatherView.update(dt);
        };
        _proto.onDestroy = function onDestroy() {
          view.off('canvas-resize', this.resizeView, this);
        };
        _proto.resizeView = function resizeView() {
          var _this$node$getCompone;
          var _screen$windowSize = screen.windowSize,
            width = _screen$windowSize.width,
            height = _screen$windowSize.height;
          if (width <= 0 || height <= 0) return;
          var policy = width * H >= height * W ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH;
          view.setDesignResolutionSize(W, H, policy);
          (_this$node$getCompone = this.node.getComponent(Widget)) == null || _this$node$getCompone.updateAlignment();
          this.layoutRoom();
          this.resizeOverlay();
        };
        _proto.layoutRoom = function layoutRoom() {
          var _this$footer;
          if (!this.roomViewport || !this.room || !this.roomHeader) return;
          var _view$getVisibleSize = view.getVisibleSize(),
            width = _view$getVisibleSize.width,
            height = _view$getVisibleSize.height;
          var roomHeight = ROOM_TOP + height / 2;
          var oldTravel = this.roomWidth * this.roomScale - this.roomViewportWidth;
          var fraction = oldTravel > 0 ? this.room.position.x / oldTravel : 0;
          this.roomScale = roomHeight / ROOM_VIEW_H;
          this.roomViewportWidth = Math.min(width, this.roomWidth * this.roomScale);
          this.roomViewport.setPosition(0, ROOM_TOP - roomHeight / 2);
          this.roomViewport.getComponent(UITransform).setContentSize(this.roomViewportWidth, roomHeight);
          this.room.setScale(this.roomScale, this.roomScale, 1);
          this.panRoom(fraction * (this.roomWidth * this.roomScale - this.roomViewportWidth));
          var header = this.roomHeader;
          header.clear();
          header.fillColor = HEADER_COLOR;
          header.rect(-width / 2, ROOM_TOP, width, height / 2 - ROOM_TOP);
          header.fill();
          header.fillColor = HEADER_EDGE;
          header.rect(-width / 2, ROOM_TOP - 2, width, 4);
          header.fill();
          (_this$footer = this.footer) == null || _this$footer.setPosition(0, (H - height) / 2);
        };
        _proto.resizeOverlay = function resizeOverlay() {
          if (!this.overlay || !this.overlayDim) return;
          var _view$getVisibleSize2 = view.getVisibleSize(),
            width = _view$getVisibleSize2.width,
            height = _view$getVisibleSize2.height;
          this.overlay.getComponent(UITransform).setContentSize(width, height);
          this.overlayDim.clear();
          this.overlayDim.fillColor = new Color(44, 36, 30, 162);
          this.overlayDim.rect(-width / 2, -height / 2, width, height);
          this.overlayDim.fill();
        };
        _proto.openOverlay = function openOverlay(name) {
          var overlay = this.makeNode(this.node, name);
          overlay.addComponent(UITransform);
          overlay.addComponent(BlockInputEvents);
          this.overlay = overlay;
          this.overlayDim = this.makeNode(overlay, 'Dim').addComponent(Graphics);
          this.resizeOverlay();
          return overlay;
        };
        _proto.showLoading = function showLoading() {
          this.clearDynamicNodes();
          this.makeLabel(this.node, 'Getting things ready…', 0, 0, 500, 60, 30, INK);
        };
        _proto.loadLevel = function loadLevel(index) {
          var _this$audio;
          this.levelIndex = index % LEVELS.length;
          this.level = LEVELS[this.levelIndex];
          (_this$audio = this.audio) == null || _this$audio.setRoom(this.level.room);
          this.held = Array(this.level.stagingCapacity).fill(null);
          this.piles = this.level.piles.map(function (p) {
            return [].concat(p.items);
          });
          this.remaining = emptyCategoryCounts();
          this.collected = emptyCategoryCounts();
          this.shownHint = false;
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.piles), _step4; !(_step4 = _iterator4()).done;) {
            var pile = _step4.value;
            for (var _iterator5 = _createForOfIteratorHelperLoose(pile), _step5; !(_step5 = _iterator5()).done;) {
              var item = _step5.value;
              this.remaining[ITEM_CATEGORY[item]]++;
            }
          }
          this.total = _extends({}, this.remaining);
          this.roomTouch = null;
          this.roomVelocity = 0;
          this.busy = false;
          this.pendingMoves = 0;
          this.swappingBin = null;
          this.overlay = null;
          this.overlayDim = null;
          this.footer = null;
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
            this.setStatus('Swipe to explore. Unmatched items wait in the tray.');
          }
        };
        _proto.drawRoom = function drawRoom() {
          var viewport = this.makeNode(this.levelRoot, 'Room viewport');
          this.roomViewport = viewport;
          viewport.addComponent(UITransform);
          viewport.addComponent(Mask).type = Mask.Type.GRAPHICS_RECT;
          viewport.on(Node.EventType.TOUCH_START, this.beginRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_MOVE, this.moveRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_END, this.endRoomTouch, this);
          viewport.on(Node.EventType.TOUCH_CANCEL, this.cancelRoomTouch, this);
          this.room = this.makeNode(viewport, 'Scrollable room');
          var source = this.frames.get(this.level.room).originalSize;
          var scale = ROOM_VIEW_H / source.height;
          var _this$level$focus = this.level.focus,
            left = _this$level$focus.left,
            right = _this$level$focus.right;
          this.roomCenter = (left + right) / 2;
          this.roomWidth = (right - left) * scale;
          var artX = (source.width / 2 - this.roomCenter) * scale;
          this.roomArt = this.makeSprite(this.room, this.level.room, artX, 0, source.width * scale, ROOM_VIEW_H).getComponent(Sprite);
          var window = ROOM_WINDOWS[this.level.room];
          this.weatherView = null;
          if (window) {
            var weather = this.makeNode(this.room, 'Window weather');
            weather.setPosition((window.x - this.roomCenter) * scale, ROOM_VIEW_H / 2 - window.y * scale);
            weather.setScale(scale / window.density, scale / window.density, 1);
            this.weatherView = new DailyTidyWeather(weather, window.panes);
          }
          this.applyWeather();
          this.roomHeader = this.makeNode(this.levelRoot, 'Header').addComponent(Graphics);
          this.layoutRoom();
        };
        _proto.drawHeader = function drawHeader() {
          var _this4 = this;
          this.makeSprite(this.levelRoot, 'logo', -131, 590, 384);
          this.drawWeatherControls();
          var reset = this.makeSprite(this.levelRoot, 'restart', 299, 582, 66);
          reset.on(Node.EventType.TOUCH_END, function () {
            return _this4.loadLevel(_this4.levelIndex);
          }, this);
          this.makeSprite(this.levelRoot, 'track', 0, 521, 462, 31);
          this.progressBar = this.makeNode(this.levelRoot, 'Progress fill').addComponent(Graphics);
          this.progressBar.node.setPosition(-PROGRESS_WIDTH / 2, 521);
          this.progressText = this.makeLabel(this.levelRoot, '', 0, 521, 192, 27, 21, INK, true);
        };
        _proto.drawWeatherControls = function drawWeatherControls() {
          var _this5 = this;
          var weather = this.makePanel(this.levelRoot, 'Weather', 136, 583, 125, 53, new Color('#EFE0C9'), 23);
          this.weatherLabel = this.makeLabel(weather, '', 15, 0, 77, 35, 19, INK, true);
          var icon = this.makeNode(weather, 'Weather icon');
          icon.setPosition(-41, 0);
          this.weatherIcon = icon.addComponent(Graphics);
          this.updateWeatherControl();
          weather.on(Node.EventType.TOUCH_END, function () {
            var index = WEATHER_STATES.indexOf(_this5.weather);
            _this5.weather = WEATHER_STATES[(index + 1) % WEATHER_STATES.length];
            _this5.applyWeather();
            _this5.updateWeatherControl();
          }, this);
          var audio = this.makePanel(this.levelRoot, 'Audio toggle', 228, 583, 49, 53, new Color('#EFE0C9'), 23);
          this.soundIcon = this.makeNode(audio, 'Speaker icon').addComponent(Graphics);
          this.updateSoundControl();
          audio.on(Node.EventType.TOUCH_END, function () {
            var _this5$audio;
            _this5.soundEnabled = !_this5.soundEnabled;
            (_this5$audio = _this5.audio) == null || _this5$audio.setEnabled(_this5.soundEnabled);
            _this5.updateSoundControl();
            _this5.setStatus(_this5.soundEnabled ? 'Sound on' : 'Sound off');
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
              var _x4 = Math.cos(_a);
              var y = Math.sin(_a);
              icon.moveTo(0, 0);
              icon.lineTo(12 * _x4, 12 * y);
              icon.moveTo(7 * _x4 + 3 * y, 7 * y - 3 * _x4);
              icon.lineTo(9 * _x4, 9 * y);
              icon.lineTo(7 * _x4 - 3 * y, 7 * y + 3 * _x4);
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
          var _this6 = this;
          this.itemViews = [];
          var roomSize = this.frames.get(this.level.room).originalSize;
          var artScale = ROOM_VIEW_H / roomSize.height;
          var order = Array.from(this.level.piles.keys()).sort(function (a, b) {
            return _this6.level.piles[a].y - _this6.level.piles[b].y;
          });
          var _loop = function _loop() {
            var pileIndex = _step6.value;
            var pile = _this6.level.piles[pileIndex];
            var baseWidth = pile.width * artScale;
            var baseX = (pile.x - _this6.roomCenter) * artScale;
            var contactY = (roomSize.height / 2 - pile.y) * artScale;
            _this6.piles[pileIndex].forEach(function (kind, index) {
              var _index, _pile$stackOffset, _index2, _pile$angle, _index3, _ITEM_FOOTPRINT$kind;
              var widthRatio = (_index = [1, 0.94, 0.86, 0.81][index]) != null ? _index : 0.76;
              var visibleWidth = baseWidth * widthRatio * (kind === 'ball' ? 0.76 : 1);
              var direction = ((_pile$stackOffset = pile.stackOffset) != null ? _pile$stackOffset : 0.2) < 0 ? -1 : 1;
              var offset = direction * baseWidth * ((_index2 = [0, 0.19, -0.13, 0.27][index]) != null ? _index2 : -0.22);
              var contactShadow = _this6.drawContactShadow(baseX + offset, contactY, visibleWidth, index > 0);
              var n = _this6.makeNode(_this6.room, kind + "-" + pileIndex + "-" + index);
              var angle = (_pile$angle = pile.angle) != null ? _pile$angle : 0;
              var restAngle = (_index3 = [0, 7, -9, 5][index]) != null ? _index3 : -6;
              var rotation = FLAT_ITEMS.has(kind) ? restAngle : restAngle * 0.55;
              n.angle = angle + rotation * direction;
              var trans = n.addComponent(UITransform);
              var sprite = n.addComponent(Sprite);
              sprite.sizeMode = Sprite.SizeMode.CUSTOM;
              sprite.trim = false;
              var frame = _this6.frames.get(kind);
              sprite.spriteFrame = frame;
              var source = frame.originalSize;
              var footprint = (_ITEM_FOOTPRINT$kind = ITEM_FOOTPRINT[kind]) != null ? _ITEM_FOOTPRINT$kind : TIGHT_FOOTPRINT;
              var width = visibleWidth / footprint.width;
              var foreshortening = FLAT_ITEMS.has(kind) ? pile.y < 400 ? 0.79 : 0.90 : 1;
              var height = width * source.height / source.width * foreshortening;
              var visibleHeight = height * footprint.height;
              var ball = kind === 'ball';
              trans.setContentSize(width, height);
              // A ball rotates around its center while its contact point stays on the floor.
              trans.setAnchorPoint(footprint.center, footprint.bottom + (ball ? footprint.height / 2 : 0));
              n.setPosition(baseX + offset, contactY + (ball ? visibleHeight / 2 : 0));
              _this6.itemViews.push({
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

              // Upper items overlap the front silhouette instead of sitting edge to edge.
              contactY += Math.min(visibleHeight * (FLAT_ITEMS.has(kind) ? 0.36 : 0.24), baseWidth * 0.18);
            });
          };
          for (var _iterator6 = _createForOfIteratorHelperLoose(order), _step6; !(_step6 = _iterator6()).done;) {
            _loop();
          }
        };
        _proto.drawContactShadow = function drawContactShadow(x, y, width, upper) {
          var shadow = this.makeNode(this.room, 'Contact shadow');
          shadow.setPosition(x, y + width * 0.035);
          var graphics = shadow.addComponent(Graphics);
          graphics.fillColor = new Color(65, 37, 17, upper ? 27 : 42);
          graphics.ellipse(0, 0, width * 0.45, width * 0.09);
          graphics.fill();
          graphics.fillColor = new Color(65, 37, 17, upper ? 18 : 33);
          graphics.ellipse(0, 0, width * 0.32, width * 0.06);
          graphics.fill();
          return shadow;
        };
        _proto.drawBins = function drawBins() {
          var _this$level$visibleBo,
            _this7 = this;
          this.bins = [];
          var footer = this.makeNode(this.levelRoot, 'Footer');
          this.footer = footer;
          footer.setPosition(0, (H - view.getVisibleSize().height) / 2);
          var message = this.makePanel(footer, 'Room message', -131, -580, 394, 44, new Color(250, 237, 218, 238), 20);
          this.status = this.makeLabel(message, '', 0, 0, 372, 33, 19, INK, true);
          message.active = false;
          this.roomPosition = this.makeNode(footer, 'Room position').addComponent(Graphics);
          this.roomPosition.node.setPosition(-35, -616);
          this.updateRoomPosition();
          var categories = this.level.categories.slice(0, (_this$level$visibleBo = this.level.visibleBoxes) != null ? _this$level$visibleBo : 3);
          var count = categories.length;
          var width = count === 2 ? 252 : 222;
          var gap = 11;
          categories.forEach(function (category, i) {
            var x = (i - (count - 1) / 2) * (width + gap);
            var bin = {
              category: category,
              node: _this7.makeNode(_this7.levelRoot, 'Bin'),
              x: x,
              y: 444,
              width: width,
              height: 94,
              highlight: null
            };
            bin.node.setPosition(x, bin.y);
            _this7.bins.push(bin);
            _this7.renderBin(bin);
          });
          this.drawStagingTray();
          var hint = this.makeSprite(footer, 'find', 222, -595, 236, 64);
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
        _proto.drawStagingTray = function drawStagingTray() {
          var _this8 = this;
          var capacity = this.held.length;
          var step = 59;
          var labelWidth = 150;
          var width = labelWidth + step * capacity + 20;
          var tray = this.makePanel(this.levelRoot, 'Holding tray', 0, STAGING_Y, width, 63, new Color('#D0AD88'), 14);
          this.makePanel(tray, 'Tray liner', 0, 2, width - 5, 56, new Color('#EDDDC0'), 12);
          var labelX = -width / 2 + labelWidth / 2 + 4;
          this.makeLabel(tray, 'HOLDING TRAY', labelX, 10, labelWidth, 24, 17, INK, true);
          this.stagingCount = this.makeLabel(tray, '', labelX, -12, labelWidth, 22, 17, INK);
          this.slots = this.held.map(function (_, i) {
            var x = -width / 2 + labelWidth + (i + 0.5) * step;
            var slot = _this8.makePanel(tray, "Holding slot " + (i + 1), x, 2, 51, 46, new Color('#C6AA83'), 9);
            _this8.makePanel(slot, 'Recess', 0, -1, 46, 40, new Color('#FAEED9'), 7);
            return slot;
          });
          this.updateStagingCount();
        };
        _proto.updateStagingCount = function updateStagingCount() {
          if (!this.stagingCount) return;
          var used = this.held.filter(Boolean).length;
          this.stagingCount.string = used + " / " + this.held.length;
          this.stagingCount.color = used === this.held.length ? new Color('#8B3E25') : INK;
        };
        _proto.renderBin = function renderBin(bin) {
          bin.node.destroyAllChildren();
          this.makeSprite(bin.node, bin.category ? BIN_ART[bin.category] : 'bin_empty', 0, 0, bin.width, bin.height);
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
          var example = BIN_ICON_ITEMS[category];
          if (example) {
            var source = this.frames.get(example).originalSize;
            this.makeSprite(parent, example, x, y, Math.min(37, 33 * source.width / source.height));
            return;
          }
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
          if (Math.abs(point.x) > this.roomViewportWidth / 2 || point.y > ROOM_TOP || point.y < -view.getVisibleSize().height / 2) return;
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
          var limitX = Math.max(0, (this.roomWidth * this.roomScale - this.roomViewportWidth) / 2);
          var position = Math.max(-limitX, Math.min(limitX, x));
          this.room.setPosition(position, 0);
          this.updateRoomPosition();
          return position;
        };
        _proto.updateRoomPosition = function updateRoomPosition() {
          if (!this.roomPosition) return;
          var travel = this.roomWidth * this.roomScale - this.roomViewportWidth;
          var graphics = this.roomPosition;
          graphics.clear();
          if (travel < 1) return;
          var fraction = 0.5 - this.room.position.x / travel;
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
          var _this$audio3;
          if (this.busy || this.overlay) return;
          if (view.index !== this.piles[view.pile].length - 1) {
            this.wiggleBlockedItem(view);
            return;
          }
          (_this$audio3 = this.audio) == null || _this$audio3.playItemTap(view.kind);
          var category = ITEM_CATEGORY[view.kind];
          var bin = this.bins.find(function (b) {
            return b.category === category;
          });
          if (bin && bin === this.swappingBin) return;
          if (bin) {
            var _view$contactShadow;
            (_view$contactShadow = view.contactShadow) == null || _view$contactShadow.destroy();
            this.removePileItem(view);
            this.dropIntoBin(view.node, bin, category);
            return;
          }
          var free = this.held.indexOf(null);
          if (free >= 0) this.parkItem(view, free);else this.returnFromTrays(view);
        };
        _proto.removePileItem = function removePileItem(item) {
          var _this9 = this;
          this.itemViews.splice(this.itemViews.indexOf(item), 1);
          this.piles[item.pile].pop();
          var revealed = this.itemViews.find(function (v) {
            return v.pile === item.pile && v.index === _this9.piles[item.pile].length - 1;
          });
          if (revealed) {
            Tween.stopAllByTarget(revealed.node);
            revealed.node.setScale(0.96, 0.96);
            tween(revealed.node).to(0.17, {
              scale: new Vec3(1.03, 1.03, 1)
            }).to(0.13, {
              scale: new Vec3(1, 1, 1)
            }).start();
          }
        };
        _proto.parkItem = function parkItem(item, index) {
          var _item$contactShadow,
            _this$audio4,
            _this10 = this;
          this.hideStatus();
          this.pendingMoves++;
          var node = item.node;
          var slot = this.slots[index];
          var size = this.frames.get(item.kind).originalSize;
          var width = Math.min(40, 37 * size.width / size.height);
          var preview = this.makeSprite(slot, item.kind, 0, 0, width);
          preview.active = false;
          this.held[index] = {
            kind: item.kind,
            node: preview
          };
          this.updateStagingCount();
          this.removePileItem(item);
          Tween.stopAllByTarget(node);
          (_item$contactShadow = item.contactShadow) == null || _item$contactShadow.destroy();
          node.setParent(this.levelRoot, true);
          var target = new Vec3(slot.position.x, STAGING_Y - 5, 0);
          var worldScale = Math.min(1, 38 / Math.max(item.visibleWidth, item.visibleHeight));
          if (item.kind === 'ball') (_this$audio4 = this.audio) == null || _this$audio4.play('ball_air');
          tween(node).to(0.39, {
            position: target,
            angle: 0,
            scale: new Vec3(worldScale, worldScale, 1)
          }, {
            easing: 'cubicOut'
          }).call(function () {
            var _this10$audio;
            node.destroy();
            preview.active = true;
            _this10.pendingMoves--;
            (_this10$audio = _this10.audio) == null || _this10$audio.play(item.kind === 'ball' ? 'ball_land' : 'drop_box');
            _this10.setStatus(CATEGORY_NAME[ITEM_CATEGORY[item.kind]] + " will sort when its box opens.");
            _this10.resolveBoard();
          }).start();
        };
        _proto.dropIntoBin = function dropIntoBin(node, bin, category) {
          var _this11 = this;
          this.hideStatus();
          Tween.stopAllByTarget(node);
          node.setParent(this.levelRoot, true);
          var preview = node.getComponent(UITransform);
          var flightScale = Math.min(0.66, 76 / Math.max(preview.width, preview.height));
          var start = node.position.clone();
          var crest = new Vec3(bin.x, bin.y + bin.height / 2 + 49, 0);
          var opening = new Vec3(bin.x, bin.y + bin.height / 2 - 8, 0);
          var arc = Math.min(126, 64 + Math.abs(start.x - bin.x) * 0.23);
          var flightTime = Math.min(0.54, 0.36 + Vec3.distance(start, crest) / 4800);
          var bank = bin.x < start.x ? 15 : -15;
          bin.highlight.active = true;
          this.pendingMoves++;
          tween(node).to(flightTime, {
            position: crest,
            scale: new Vec3(flightScale, flightScale, 1),
            angle: bank
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate(_target, t) {
              var position = node.position;
              var curve = Math.sin(Math.PI * t);
              node.setPosition(position.x + bank * 1.7 * curve, position.y + arc * curve, position.z);
            }
          }).to(0.11, {
            position: opening,
            scale: new Vec3(0.47, 0.47, 1),
            angle: -bank * 0.4
          }, {
            easing: 'quadIn'
          }).call(function () {
            var _this11$audio;
            // The box artwork masks the item once it crosses the lip.
            node.setSiblingIndex(bin.node.getSiblingIndex());
            _this11.collectFeedback(bin);
            (_this11$audio = _this11.audio) == null || _this11$audio.play('drop_box');
          }).to(0.1, {
            position: new Vec3(bin.x, bin.y + 1, 0),
            scale: new Vec3(0.12, 0.12, 1),
            angle: 0
          }, {
            easing: 'quadIn'
          }).call(function () {
            node.destroy();
            _this11.pendingMoves--;
            _this11.remaining[category]--;
            _this11.collected[category]++;
            _this11.renderBin(bin);
            _this11.updateProgress();
            _this11.resolveBoard();
          }).start();
        };
        _proto.resolveBoard = function resolveBoard() {
          var _this12 = this;
          // Flights reserve their destination at tap time. Box changes and results
          // wait for those reservations to be settled.
          if (this.pendingMoves || this.swappingBin || this.busy || this.overlay) return;
          var _loop2 = function _loop2() {
              var _step7$value = _step7.value,
                index = _step7$value[0],
                item = _step7$value[1];
              if (!item) return 0; // continue
              var category = ITEM_CATEGORY[item.kind];
              var bin = _this12.bins.find(function (box) {
                return box.category === category;
              });
              if (!bin) return 0; // continue
              _this12.held[index] = null;
              _this12.dropIntoBin(item.node, bin, category);
            },
            _ret;
          for (var _iterator7 = _createForOfIteratorHelperLoose(this.held.entries()), _step7; !(_step7 = _iterator7()).done;) {
            _ret = _loop2();
            if (_ret === 0) continue;
          }
          if (this.pendingMoves) {
            this.updateStagingCount();
            return;
          }
          if (this.allClear()) {
            this.busy = true;
            tween(this.levelRoot).delay(0.18).call(function () {
              _this12.busy = false;
              _this12.showWin();
            }).start();
            return;
          }
          var full = this.bins.find(function (bin) {
            return bin.category && _this12.remaining[bin.category] === 0;
          });
          if (full) {
            this.finishBin(full);
            return;
          }
          if (this.held.indexOf(null) === -1 && !this.hasDirectMove()) this.showBlocked();
        };
        _proto.hasDirectMove = function hasDirectMove() {
          var _this13 = this;
          return this.piles.some(function (pile) {
            return pile.length > 0 && _this13.bins.some(function (bin) {
              return bin.category === ITEM_CATEGORY[pile[pile.length - 1]];
            });
          });
        };
        _proto.showBlocked = function showBlocked() {
          var _this$audio5,
            _this14 = this;
          (_this$audio5 = this.audio) == null || _this$audio5.play('blocked');
          var overlay = this.openOverlay('No moves left');
          this.makePanel(overlay, 'Card shadow', 0, -8, 584, 332, new Color('#B7996F'), 30);
          this.makePanel(overlay, 'Card', 0, 0, 584, 332, new Color('#FFF8EC'), 30);
          this.makeLabel(overlay, 'NO MOVES LEFT', 0, 92, 520, 65, 35, INK, true);
          this.makeLabel(overlay, 'The holding tray is full and no exposed item fits an open box.', 0, 24, 480, 66, 23, INK);
          this.makeLabel(overlay, 'Try saving a slot for an item that covers what you need.', 0, -37, 480, 46, 19, INK);
          var restart = this.makeSprite(overlay, 'find', 0, -109, 326, 70);
          this.makeLabel(restart, 'Retry Space', 0, 0, 300, 54, 27, INK, true);
          restart.on(Node.EventType.TOUCH_END, function () {
            return _this14.loadLevel(_this14.levelIndex);
          }, this);
        };
        _proto.wiggleBlockedItem = function wiggleBlockedItem(item) {
          var _this$audio6, _this$audio7;
          this.hideStatus();
          (_this$audio6 = this.audio) == null || _this$audio6.playItemTap(item.kind);
          (_this$audio7 = this.audio) == null || _this$audio7.play('pinned');
          Tween.stopAllByTarget(item.node);
          item.node.setPosition(item.home);
          item.node.setScale(1, 1);
          tween(item.node).to(0.06, {
            angle: item.homeAngle - 6
          }).to(0.08, {
            angle: item.homeAngle + 5
          }).to(0.08, {
            angle: item.homeAngle
          }).start();
        };
        _proto.returnFromTrays = function returnFromTrays(item) {
          var _this$audio8,
            _this15 = this;
          this.setStatus('Tray full. Look for an item that fits an open box.');
          var node = item.node;
          Tween.stopAllByTarget(node);
          node.setPosition(item.home);
          node.setScale(1, 1);
          node.angle = item.homeAngle;
          var parent = node.parent;
          var sibling = node.getSiblingIndex();
          node.setParent(this.levelRoot, true);
          var landing = node.position.clone();
          var landingScale = node.scale.clone();
          var tray = this.bins.reduce(function (nearest, bin) {
            return Math.abs(bin.x - landing.x) < Math.abs(nearest.x - landing.x) ? bin : nearest;
          });
          this.busy = true;
          if (item.kind === 'ball') (_this$audio8 = this.audio) == null || _this$audio8.play('ball_air');
          tween(node).to(0.29, {
            position: new Vec3(tray.x, ROOM_TOP - 12, 0),
            scale: new Vec3(0.82 * landingScale.x, 0.82 * landingScale.y, 1),
            angle: item.homeAngle - 8
          }, {
            easing: 'cubicOut'
          }).call(function () {
            var _this15$audio;
            return (_this15$audio = _this15.audio) == null ? void 0 : _this15$audio.play('blocked');
          }).to(0.10, {
            angle: item.homeAngle + 8
          }, {
            easing: 'sineInOut'
          }).to(0.27, {
            position: landing,
            scale: landingScale,
            angle: item.homeAngle
          }, {
            easing: 'quadIn'
          }).call(function () {
            node.setParent(parent);
            node.setSiblingIndex(sibling);
            node.setPosition(item.home);
            node.setScale(1, 1);
            if (item.kind === 'ball') {
              var _this15$audio2;
              (_this15$audio2 = _this15.audio) == null || _this15$audio2.play('ball_land');
              _this15.bounceBall(item);
            } else {
              _this15.busy = false;
              _this15.resolveBoard();
            }
          }).start();
        };
        _proto.bounceBall = function bounceBall(item) {
          var _this16 = this;
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
          }).call(function () {
            var _this16$audio;
            return (_this16$audio = _this16.audio) == null ? void 0 : _this16$audio.play('ball_bounce');
          }).to(0.07, {
            position: new Vec3(item.home.x, item.home.y + rise * 0.3, 0)
          }, {
            easing: 'quadOut'
          }).to(0.08, {
            position: item.home
          }, {
            easing: 'quadIn'
          }).call(function () {
            var _this16$audio2;
            (_this16$audio2 = _this16.audio) == null || _this16$audio2.play('ball_roll');
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
            _this16.busy = false;
            _this16.resolveBoard();
          }).start();
        };
        _proto.finishBin = function finishBin(bin) {
          var _this17 = this,
            _node$getComponent;
          this.swappingBin = bin;
          var next = this.level.categories.find(function (category) {
            return _this17.remaining[category] > 0 && !_this17.bins.some(function (slot) {
              return slot.category === category;
            });
          });
          var node = bin.node;
          var opacity = (_node$getComponent = node.getComponent(UIOpacity)) != null ? _node$getComponent : node.addComponent(UIOpacity);
          var direction = bin.x > 0 ? 1 : -1;
          var away = new Vec3(bin.x + direction * 40, bin.y + 116, 0);
          tween(node).delay(0.16).call(function () {
            var _this17$audio;
            return (_this17$audio = _this17.audio) == null ? void 0 : _this17$audio.play('box_lift');
          }).to(0.28, {
            position: away,
            angle: direction * -7,
            scale: new Vec3(0.94, 0.94, 1)
          }, {
            easing: 'quadIn',
            onUpdate: function onUpdate(_node, t) {
              opacity.opacity = Math.round(255 * (1 - t * t));
            }
          }).call(function () {
            bin.category = next != null ? next : null;
            _this17.renderBin(bin);
            node.setPosition(bin.x - direction * 25, bin.y + 79);
            node.angle = direction * 5;
            node.setScale(0.96, 0.96, 1);
          }).to(0.29, {
            position: new Vec3(bin.x, bin.y, 0),
            angle: 0
          }, {
            easing: 'cubicIn',
            onUpdate: function onUpdate(_node, t) {
              opacity.opacity = Math.round(255 * Math.min(1, t * 1.7));
            }
          }).call(function () {
            var _this17$audio2;
            (_this17$audio2 = _this17.audio) == null || _this17$audio2.play('box_set');
          }).to(0.07, {
            scale: new Vec3(1.04, 0.94, 1)
          }, {
            easing: 'quadOut'
          }).to(0.12, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineOut'
          }).call(function () {
            _this17.swappingBin = null;
            _this17.resolveBoard();
          }).start();
        };
        _proto.showWin = function showWin() {
          var _this$audio9,
            _this18 = this;
          (_this$audio9 = this.audio) == null || _this$audio9.play('win');
          var overlay = this.openOverlay('Level complete');
          this.makePanel(overlay, 'Card shadow', 0, -10, 596, 480, new Color('#B7996F'), 34);
          this.makePanel(overlay, 'Card', 0, 0, 596, 480, new Color('#FFF8EC'), 34);
          var art = this.makeNode(overlay, 'Completion stars').addComponent(Graphics);
          for (var i = 0; i < 3; i++) this.drawStar(art, (i - 1) * 76, 157, i === 1 ? 37 : 27);
          this.makeLabel(overlay, 'ALL TIDIED!', 0, 70, 560, 72, 42, INK, true);
          var count = Object.keys(this.total).reduce(function (n, key) {
            return n + _this18.total[key];
          }, 0);
          this.makeLabel(overlay, count + " items back where they belong.", 0, 0, 530, 54, 25, new Color('#827267'));
          this.makeLabel(overlay, this.shownHint ? 'A little help. A lovely tidy room.' : 'Beautifully done — all on your own!', 0, -54, 530, 36, 20, new Color('#9A805F'));
          var last = this.levelIndex === LEVELS.length - 1;
          var button = this.makeSprite(overlay, 'find', 0, -150, 344, 76);
          var title = last ? 'Play Again' : 'Next Space';
          var buttonLabel = this.makeLabel(button, title, 0, 0, 300, 56, 28, INK, true);
          var next = (this.levelIndex + 1) % LEVELS.length;
          var preloaded = this.loadLevelArt(next)["catch"](function () {
            return undefined;
          });
          button.on(Node.EventType.TOUCH_END, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (!_this18.busy) {
                    _context4.next = 2;
                    break;
                  }
                  return _context4.abrupt("return");
                case 2:
                  _this18.busy = true;
                  buttonLabel.string = 'Opening…';
                  _context4.prev = 4;
                  _context4.next = 7;
                  return preloaded;
                case 7:
                  _context4.next = 9;
                  return _this18.loadLevelArt(next);
                case 9:
                  if (_this18.node.isValid) _this18.loadLevel(next);
                  _context4.next = 16;
                  break;
                case 12:
                  _context4.prev = 12;
                  _context4.t0 = _context4["catch"](4);
                  console.warn('Could not load next space', _context4.t0);
                  if (button.isValid) {
                    buttonLabel.string = 'Try Again';
                    _this18.busy = false;
                  }
                case 16:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, null, [[4, 12]]);
          })), this);
        };
        _proto.allClear = function allClear() {
          return this.piles.every(function (p) {
            return p.length === 0;
          }) && this.held.every(function (item) {
            return item === null;
          });
        };
        _proto.clearDynamicNodes = function clearDynamicNodes() {
          // The Camera belongs to the serialized Canvas and must survive restarts.
          var stop = function stop(node) {
            Tween.stopAllByTarget(node);
            node.children.forEach(stop);
          };
          for (var _i3 = 0, _arr2 = [].concat(this.node.children); _i3 < _arr2.length; _i3++) {
            var _this$audio10;
            var child = _arr2[_i3];
            if (child.name !== 'Camera' && child.name !== 'RoomBackdrop' && child !== ((_this$audio10 = this.audio) == null ? void 0 : _this$audio10.node)) {
              stop(child);
              child.destroy();
            }
          }
        };
        _proto.updateProgress = function updateProgress() {
          var _this19 = this;
          var total = Object.keys(this.total).reduce(function (n, c) {
            return n + _this19.total[c];
          }, 0);
          var done = Object.keys(this.collected).reduce(function (n, c) {
            return n + _this19.collected[c];
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
          var _this20 = this,
            _ref2,
            _ref3,
            _candidates$find,
            _this$audio11;
          if (this.busy || this.roomTouch || this.overlay) return;
          this.roomVelocity = 0;
          var roomX = this.room.position.x;
          var candidates = this.itemViews.filter(function (v) {
            return v.node.isValid && v.index === _this20.piles[v.pile].length - 1 && _this20.bins.some(function (b) {
              return b !== _this20.swappingBin && b.category === ITEM_CATEGORY[v.kind];
            });
          });
          var visible = function visible(item) {
            return Math.abs(item.home.x * _this20.roomScale + roomX) + item.visibleWidth * _this20.roomScale / 2 <= _this20.roomViewportWidth / 2 - 18;
          };
          var staging = this.held.indexOf(null) >= 0 ? this.itemViews.filter(function (item) {
            var pile = _this20.piles[item.pile];
            return item.index === pile.length - 1 && pile.slice(0, -1).some(function (kind) {
              return _this20.bins.some(function (bin) {
                return bin.category === ITEM_CATEGORY[kind];
              });
            });
          }) : [];
          var next = (_ref2 = (_ref3 = (_candidates$find = candidates.find(visible)) != null ? _candidates$find : candidates[0]) != null ? _ref3 : staging.find(visible)) != null ? _ref2 : staging[0];
          if (!next) return;
          this.shownHint = true;
          (_this$audio11 = this.audio) == null || _this$audio11.play('hint');
          if (!visible(next)) this.panRoom(-next.home.x * this.roomScale);
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
          this.setStatus(candidates.length ? "Try this item \u2014 it belongs in " + CATEGORY_NAME[ITEM_CATEGORY[next.kind]] + "." : 'Park this item to uncover something you can sort.');
        };
        _proto.collectFeedback = function collectFeedback(bin) {
          Tween.stopAllByTarget(bin.node);
          bin.node.setScale(1, 1);
          tween(bin.node).to(0.075, {
            scale: new Vec3(1.055, 0.91, 1)
          }, {
            easing: 'quadOut'
          }).to(0.105, {
            scale: new Vec3(0.985, 1.045, 1)
          }, {
            easing: 'sineOut'
          }).to(0.095, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineInOut'
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
      var ATTIC_PANES = [[[167, 48], [205, 48], [205, 183], [134, 183]], [[228, 48], [346, 49], [349, 185], [228, 185]], [[413, 51], [529, 51], [529, 185], [413, 185]], [[554, 51], [640, 52], [666, 185], [554, 185]], [[125, 206], [205, 206], [205, 334], [92, 334]], [[229, 206], [347, 206], [349, 334], [229, 334]], [[414, 208], [530, 208], [530, 334], [414, 334]], [[555, 208], [673, 208], [675, 334], [555, 334]], [[93, 359], [206, 359], [206, 500], [92, 500]], [[230, 359], [348, 359], [349, 500], [230, 500]], [[415, 359], [530, 359], [530, 500], [414, 500]], [[555, 359], [674, 359], [676, 500], [555, 500]]];

      // Each pane follows exposed glass. Coordinates are relative to the artwork's top-left.
      function pane(left, top, right, bottom) {
        return [[left, top], [right, top], [right, bottom], [left, bottom]];
      }
      var ROOM_WINDOWS = exports('ROOM_WINDOWS', {
        attic: {
          x: 155,
          y: 80,
          density: 2,
          panes: ATTIC_PANES
        },
        bedroom: {
          x: 0,
          y: 0,
          density: 1,
          panes: [pane(106, 158, 139, 216), pane(185, 164, 332, 406), pane(376, 170, 425, 224), pane(106, 227, 139, 278), pane(376, 236, 431, 280), pane(96, 290, 139, 350), pane(378, 290, 438, 337), pane(87, 359, 138, 417), pane(378, 347, 455, 409)]
        },
        studio: {
          x: 0,
          y: 0,
          density: 1,
          panes: [pane(116, 130, 193, 179), pane(203, 118, 264, 178), pane(287, 119, 353, 178), pane(367, 121, 424, 179), pane(444, 120, 487, 178), pane(505, 123, 545, 179), pane(105, 194, 190, 250), pane(203, 194, 262, 250), pane(286, 194, 353, 250), pane(369, 194, 424, 250), pane(443, 193, 486, 250), pane(502, 193, 555, 251), pane(107, 263, 189, 335), pane(202, 263, 263, 335), pane(286, 264, 353, 336), pane(370, 264, 426, 337), pane(444, 263, 488, 336), pane(503, 265, 562, 337)]
        },
        office: {
          x: 0,
          y: 0,
          density: 1,
          panes: [pane(103, 140, 119, 203), pane(129, 139, 171, 203), pane(181, 138, 228, 203), pane(238, 140, 266, 203), pane(89, 216, 119, 279), pane(129, 215, 170, 279), pane(182, 215, 228, 279), pane(239, 215, 276, 279), pane(79, 301, 118, 365), pane(130, 300, 170, 365), pane(183, 300, 228, 365), pane(240, 301, 287, 365), pane(79, 377, 119, 444), pane(129, 377, 171, 444), pane(182, 377, 229, 444), pane(239, 377, 286, 444)]
        }
      });
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
        function DailyTidyWeather(node, panes) {
          this.glass = void 0;
          this.particles = void 0;
          this.weather = 'sunny';
          this.time = 0;
          this.frameTime = 0;
          this.width = void 0;
          this.node = node;
          this.panes = panes;
          this.width = Math.max.apply(Math, panes.map(function (p) {
            return Math.max.apply(Math, p.map(function (_ref) {
              var x = _ref[0];
              return x;
            }));
          }));
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
            for (var _iterator = _createForOfIteratorHelperLoose(this.panes), _step; !(_step = _iterator()).done;) {
              var _pane = _step.value;
              this.glass.moveTo(_pane[0][0], -_pane[0][1]);
              for (var _iterator2 = _createForOfIteratorHelperLoose(_pane.slice(1)), _step2; !(_step2 = _iterator2()).done;) {
                var _step2$value = _step2.value,
                  x = _step2$value[0],
                  y = _step2$value[1];
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
          var sill = Math.max.apply(Math, this.panes.map(function (p) {
            return p[2][1];
          }));
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.panes.filter(function (p) {
              return p[2][1] >= sill - 22;
            })), _step3; !(_step3 = _iterator3()).done;) {
            var _pane2 = _step3.value;
            var _point = point(_pane2, 0, 0.94),
              x = _point[0],
              y = _point[1];
            this.glass.moveTo(x, -y);
            for (var _i = 0, _arr = [[0.22, 0.91], [0.45, 0.95], [0.73, 0.92], [1, 0.93], [1, 1], [0, 1]]; _i < _arr.length; _i++) {
              var _arr$_i = _arr[_i],
                u = _arr$_i[0],
                v = _arr$_i[1];
              var _point2 = point(_pane2, u, v),
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
              var _point3 = point(this.panes[2], 0.09 + cycle * 0.49 + i * 0.16, 0.32 + i * 0.13),
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
          this.panes.forEach(function (pane, index) {
            var count = raining ? 8 : 6;
            for (var _i2 = 0; _i2 < count; _i2++) {
              var speed = raining ? 1.7 + _i2 * 0.13 : 0.23 + _i2 * 0.018;
              var v = (index * 0.071 + _i2 * 0.147 + _this.time * speed) % 1;
              var drift = raining ? -v * 0.14 : Math.sin(_this.time * 1.2 + _i2) * 0.065;
              var u = 0.21 + _i2 * 0.085 + index % 3 * 0.02 + drift;
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
                g.circle(_x, -_y, 1.7 + _i2 % 3 * 0.6);
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
      exports('emptyCategoryCounts', emptyCategoryCounts);
      cclegacy._RF.push({}, "dc61d/QGKJOPInhhLHoHZQB", "LevelData", undefined);
      var CATEGORY_NAME = exports('CATEGORY_NAME', {
        toys: 'Toys',
        books: 'Books',
        clothes: 'Clothes',
        sports: 'Sports',
        linens: 'Linens',
        crafts: 'Crafts',
        tools: 'Tools',
        mail: 'Mail',
        papers: 'Papers',
        snacks: 'Snacks',
        picnic: 'Picnic Gear'
      });
      var ITEM_CATEGORY = exports('ITEM_CATEGORY', {
        teddy: 'toys',
        car: 'toys',
        train: 'toys',
        blue_book: 'books',
        red_book: 'books',
        green_book: 'books',
        shirt: 'clothes',
        hat: 'clothes',
        pajamas: 'clothes',
        slipper: 'clothes',
        towel: 'linens',
        yarn: 'crafts',
        ribbon: 'crafts',
        watercolor: 'crafts',
        brush: 'tools',
        tape: 'tools',
        stapler: 'tools',
        envelope: 'mail',
        parcel: 'mail',
        folder: 'papers',
        apple: 'snacks',
        sandwich: 'snacks',
        flask: 'picnic',
        lantern: 'picnic',
        ball: 'sports',
        shuttlecock: 'sports',
        disc: 'sports'
      });
      function emptyCategoryCounts() {
        var counts = {};
        for (var _i = 0, _arr = Object.keys(CATEGORY_NAME); _i < _arr.length; _i++) {
          var category = _arr[_i];
          counts[category] = 0;
        }
        return counts;
      }

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
        shelfHigh: {
          x: 786,
          y: 185,
          width: 75,
          angle: 2
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
        }
      };
      function atticPile(surface) {
        for (var _len = arguments.length, items = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          items[_key - 1] = arguments[_key];
        }
        return _extends({}, SURFACES[surface], {
          items: items
        });
      }
      function pile(x, y, width) {
        for (var _len2 = arguments.length, items = new Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
          items[_key2 - 3] = arguments[_key2];
        }
        return {
          x: x,
          y: y,
          width: width,
          angle: x % 7 - 3,
          stackOffset: x % 2 ? 0.22 : -0.22,
          items: items
        };
      }
      var LEVELS = exports('LEVELS', [{
        title: 'The Living Room',
        room: 'attic',
        categories: ['toys', 'books', 'clothes', 'linens'],
        focus: {
          left: 10,
          right: 1170
        },
        stagingCapacity: 6,
        piles: [atticPile('sideTable', 'blue_book', 'red_book', 'green_book'), atticPile('windowSill', 'car'), atticPile('sofaLeft', 'pajamas', 'red_book', 'shirt', 'teddy'), atticPile('sofaRight', 'shirt', 'pajamas', 'towel'), atticPile('sofaFoot', 'teddy'), atticPile('leftRugBack', 'hat'), atticPile('leftRugFront', 'green_book', 'blue_book', 'car', 'train'), atticPile('shelfHigh', 'green_book'), atticPile('shelfLow', 'car', 'towel'), atticPile('deskCorner', 'shirt', 'red_book', 'towel'), atticPile('stool', 'shirt', 'hat'), atticPile('deskFloor', 'train'), pile(682, 366, 60, 'red_book', 'teddy'), pile(617, 520, 77, 'shirt'), pile(960, 374, 70, 'hat'), pile(626, 777, 97, 'pajamas', 'red_book', 'blue_book', 'hat'), pile(810, 721, 76, 'train'), pile(935, 715, 75, 'car'), pile(232, 361, 65, 'red_book'), pile(796, 280, 66, 'blue_book', 'hat'), pile(678, 280, 65, 'car'), pile(1099, 381, 69, 'green_book'), pile(1010, 765, 80, 'hat'), pile(191, 475, 59, 'towel'), pile(454, 361, 57, 'towel'), pile(460, 742, 99, 'towel'), pile(384, 784, 103, 'shirt', 'hat'), pile(1010, 488, 57, 'towel'), pile(1077, 703, 92, 'pajamas', 'blue_book'), pile(346, 361, 60, 'towel'), pile(693, 742, 81, 'green_book', 'car'), pile(918, 778, 77, 'towel')]
      }, {
        title: 'A Quiet Morning',
        room: 'bedroom',
        categories: ['clothes', 'linens', 'toys', 'books'],
        focus: {
          left: 61,
          right: 1290
        },
        stagingCapacity: 5,
        piles: [pile(283, 519, 88, 'pajamas', 'shirt', 'green_book'), pile(282, 435, 76, 'red_book', 'blue_book', 'slipper'), pile(478, 505, 86, 'pajamas', 'shirt', 'slipper', 'teddy'), pile(634, 511, 96, 'towel', 'shirt'), pile(750, 523, 88, 'pajamas'), pile(136, 439, 72, 'hat'), pile(330, 733, 100, 'pajamas', 'towel', 'slipper', 'hat'), pile(127, 713, 75, 'slipper'), pile(761, 229, 73, 'teddy'), pile(984, 326, 85, 'pajamas', 'slipper'), pile(991, 660, 81, 'slipper'), pile(804, 727, 99, 'towel', 'hat'), pile(1072, 414, 92, 'green_book', 'towel'), pile(1119, 738, 85, 'pajamas', 'hat'), pile(946, 228, 76, 'towel', 'red_book'), pile(545, 511, 89, 'shirt', 'pajamas', 'teddy', 'blue_book'), pile(1215, 419, 74, 'blue_book', 'shirt', 'hat', 'slipper'), pile(347, 516, 69, 'towel', 'slipper'), pile(460, 762, 82, 'pajamas'), pile(179, 663, 73, 'slipper'), pile(699, 781, 88, 'pajamas', 'towel', 'teddy'), pile(939, 745, 81, 'red_book'), pile(1092, 327, 65, 'towel'), pile(571, 739, 79, 'slipper'), pile(1154, 418, 67, 'hat'), pile(387, 434, 59, 'green_book'), pile(603, 728, 96, 'shirt', 'slipper'), pile(903, 326, 72, 'blue_book'), pile(1185, 677, 80, 'towel', 'slipper'), pile(210, 765, 76, 'red_book'), pile(707, 537, 81, 'pajamas', 'towel'), pile(1018, 792, 74, 'blue_book')]
      }, {
        title: 'After Craft Time',
        room: 'studio',
        categories: ['crafts', 'tools', 'papers'],
        visibleBoxes: 2,
        focus: {
          left: 48,
          right: 1243
        },
        stagingCapacity: 5,
        piles: [pile(309, 361, 82, 'folder', 'ribbon', 'yarn'), pile(461, 360, 84, 'watercolor', 'brush', 'folder'), pile(151, 357, 74, 'ribbon'), pile(284, 463, 96, 'folder', 'watercolor', 'ribbon', 'brush'), pile(457, 451, 93, 'watercolor', 'folder', 'ribbon', 'yarn'), pile(528, 650, 86, 'yarn', 'tape'), pile(139, 677, 85, 'ribbon'), pile(332, 744, 105, 'folder', 'folder', 'watercolor', 'tape'), pile(750, 179, 83, 'yarn'), pile(808, 263, 87, 'folder', 'tape'), pile(647, 437, 76, 'ribbon'), pile(599, 362, 86, 'watercolor', 'ribbon'), pile(923, 489, 87, 'stapler'), pile(785, 672, 83, 'yarn'), pile(1098, 177, 80, 'watercolor', 'brush'), pile(1129, 260, 75, 'yarn', 'folder'), pile(1092, 362, 91, 'watercolor'), pile(522, 450, 69, 'ribbon', 'tape'), pile(858, 363, 84, 'folder', 'ribbon', 'brush', 'stapler'), pile(1067, 547, 78, 'watercolor', 'stapler'), pile(616, 744, 88, 'folder', 'watercolor', 'brush', 'yarn'), pile(1183, 747, 79, 'ribbon'), pile(1190, 364, 73, 'tape'), pile(970, 362, 75, 'brush'), pile(908, 734, 87, 'folder'), pile(700, 566, 80, 'watercolor'), pile(219, 660, 86, 'folder'), pile(485, 762, 102, 'ribbon', 'brush'), pile(704, 492, 73, 'folder'), pile(993, 547, 80, 'folder'), pile(1110, 668, 94, 'ribbon', 'yarn'), pile(654, 259, 75, 'folder'), pile(1123, 631, 77, 'watercolor', 'tape')]
      }, {
        title: 'The Parcel Office',
        room: 'office',
        categories: ['mail', 'papers', 'tools', 'books'],
        focus: {
          left: 34,
          right: 1274
        },
        stagingCapacity: 4,
        piles: [pile(113, 470, 69, 'folder', 'envelope'), pile(240, 470, 66, 'tape'), pile(126, 520, 91, 'parcel'), pile(236, 523, 98, 'green_book', 'envelope', 'parcel', 'red_book'), pile(443, 206, 78, 'folder'), pile(602, 205, 79, 'parcel', 'envelope', 'folder'), pile(454, 317, 73, 'stapler'), pile(634, 316, 74, 'envelope', 'folder'), pile(410, 544, 94, 'envelope', 'folder', 'parcel', 'tape'), pile(542, 541, 96, 'envelope', 'folder', 'blue_book'), pile(164, 720, 91, 'parcel'), pile(363, 742, 87, 'folder'), pile(661, 451, 78, 'stapler'), pile(801, 335, 79, 'parcel'), pile(981, 337, 75, 'folder', 'envelope'), pile(1114, 335, 76, 'tape'), pile(822, 451, 91, 'envelope'), pile(980, 447, 96, 'envelope', 'folder', 'tape', 'stapler'), pile(1110, 449, 92, 'parcel'), pile(1169, 452, 53, 'envelope'), pile(817, 526, 86, 'tape'), pile(1001, 524, 93, 'red_book', 'envelope'), pile(785, 644, 79, 'parcel'), pile(1064, 645, 79, 'folder'), pile(496, 208, 67, 'stapler', 'green_book'), pile(788, 526, 83, 'green_book', 'parcel'), pile(373, 546, 67, 'tape'), pile(1078, 521, 72, 'folder', 'envelope'), pile(873, 335, 71, 'parcel', 'stapler'), pile(717, 748, 81, 'envelope', 'parcel', 'envelope', 'folder'), pile(1189, 691, 78, 'parcel'), pile(134, 771, 97, 'blue_book'), pile(450, 693, 86, 'red_book'), pile(759, 594, 64, 'folder'), pile(957, 756, 94, 'blue_book'), pile(1043, 743, 81, 'green_book'), pile(924, 708, 81, 'blue_book'), pile(1164, 772, 84, 'folder', 'parcel'), pile(550, 742, 79, 'envelope', 'folder')]
      }, {
        title: 'After the Picnic',
        room: 'park',
        categories: ['snacks', 'picnic', 'linens', 'sports'],
        focus: {
          left: 665,
          right: 1842
        },
        stagingCapacity: 4,
        piles: [pile(1468, 315, 60, 'apple'), pile(1533, 370, 69, 'sandwich'), pile(1350, 452, 52, 'towel', 'flask'), pile(1490, 568, 75, 'disc', 'towel', 'sandwich', 'apple'), pile(1781, 515, 58, 'apple'), pile(1202, 537, 70, 'ball'), pile(1236, 435, 68, 'towel'), pile(1305, 655, 76, 'towel', 'sandwich', 'disc'), pile(866, 664, 77, 'ball'), pile(807, 752, 61, 'shuttlecock'), pile(1276, 519, 52, 'lantern'), pile(1156, 384, 67, 'disc', 'apple', 'sandwich'), pile(757, 363, 60, 'flask'), pile(795, 528, 65, 'shuttlecock'), pile(747, 646, 84, 'ball'), pile(879, 400, 72, 'towel', 'apple'), pile(963, 399, 65, 'towel', 'flask', 'shuttlecock'), pile(1040, 397, 64, 'sandwich'), pile(927, 543, 78, 'towel', 'towel', 'sandwich', 'apple'), pile(1073, 625, 89, 'disc'), pile(1135, 382, 57, 'lantern'), pile(1174, 512, 69, 'shuttlecock'), pile(1217, 690, 90, 'ball'), pile(1384, 315, 63, 'sandwich'), pile(1498, 313, 54, 'lantern'), pile(1602, 313, 56, 'flask'), pile(1718, 315, 67, 'apple'), pile(1428, 370, 69, 'disc', 'sandwich'), pile(1642, 370, 67, 'towel', 'disc'), pile(1373, 551, 78, 'disc', 'towel', 'towel', 'flask'), pile(1499, 522, 77, 'sandwich'), pile(1609, 551, 80, 'towel', 'sandwich', 'apple'), pile(1731, 574, 67, 'lantern'), pile(1517, 668, 82, 'disc'), pile(1727, 712, 87, 'ball'), pile(1013, 571, 75, 'disc'), pile(1267, 602, 68, 'disc', 'sandwich'), pile(926, 743, 83, 'towel', 'lantern'), pile(1043, 736, 94, 'ball'), pile(1154, 568, 75, 'disc'), pile(1454, 737, 101, 'towel', 'sandwich'), pile(1719, 644, 83, 'disc')]
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