var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var StateMachine = (function (_super) {
    __extends(StateMachine, _super);
    function StateMachine(locked, _player, stand, moveR, moveL, fight) {
        var _this = _super.call(this) || this;
        // totalEndX: number;
        // totalEndY: number;
        _this.moving = false;
        _this.timeOnEnterFrame = 0; //进入帧时间
        _this.locked = 0;
        _this.stand = stand;
        _this.moveR = moveR;
        _this.moveL = moveL;
        _this.fight = fight;
        _this.moveR.play();
        _this.moveL.play();
        _this.fight.play();
        _this.stand.play();
        _this.addChild(_this.stand);
        _this.addChild(_this.moveR);
        _this.addChild(_this.moveL);
        _this.addChild(_this.fight);
        _this.StandState = new PlayerStandState(_player, _this, "stand");
        _this.MoveState = new PlayerMoveState(_player, _this, "move");
        _this.FightState = new PlayerFightState(_player, _this, "fight");
        if (_player == null) {
        }
        _this.currentState = _this.StandState;
        _this.moveR.alpha = 0;
        _this.moveL.alpha = 0;
        _this.fight.alpha = 0;
        _this.onEnter();
        return _this;
        // this.currentX = this.model.x;
        // this.currentY = this.model.y;
        // this.x = this.model.x;
        // this.y = this.model.y;
    }
    StateMachine.prototype.onEnter = function () {
        this.currentState.onEnter();
    };
    StateMachine.prototype.onExit = function () {
        this.currentState.onExit();
    };
    StateMachine.prototype.setState = function (stateName, state) {
        if (this.currentState.getname() != stateName) {
            console.log("改状态");
            this.currentState.onExit();
            this.currentState = state;
            this.currentState.onEnter();
        }
    };
    return StateMachine;
}(dessert.DisplayObjectContainer));
////////////////////////////////////////////移动状态
var PlayerMoveState = (function () {
    function PlayerMoveState(player, stateMachine, name) {
        this._statename = name;
        //    console.log("PlayerMoveState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerMoveState.prototype.onEnter = function () {
        if (this._StateMachine.currentEndX >= this._StateMachine.x) {
            this._StateMachine.moveR.alpha = 1;
            this._currentmove = this._StateMachine.moveR;
        }
        else {
            this._StateMachine.moveL.alpha = 1;
            this._currentmove = this._StateMachine.moveL;
        }
    };
    PlayerMoveState.prototype.onExit = function () {
        this._currentmove.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    };
    PlayerMoveState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerMoveState;
}());
////////////////////////////////////站立状态
var PlayerStandState = (function () {
    function PlayerStandState(player, stateMachine, name) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerStandState.prototype.onEnter = function () {
        //console.log(this._statename + "onEnter");
        this._StateMachine.stand.alpha = 1;
    };
    PlayerStandState.prototype.onExit = function () {
        //console.log(this._statename + "onExit");
        this._StateMachine.stand.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.MoveState;
    };
    PlayerStandState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerStandState;
}());
////////////////////////////////////战斗状态
var PlayerFightState = (function () {
    function PlayerFightState(player, stateMachine, name) {
        this._statename = name;
        //  console.log("PlayerStandState constructor");
        this._StateMachine = stateMachine;
        this._player = player;
    }
    PlayerFightState.prototype.onEnter = function () {
        //console.log(this._statename + "onEnter");
        this._StateMachine.fight.alpha = 1;
    };
    PlayerFightState.prototype.onExit = function () {
        //console.log(this._statename + "onExit");
        this._StateMachine.fight.alpha = 0;
        //this._StateMachine.currentState = this._StateMachine.StandState;
    };
    PlayerFightState.prototype.getname = function () {
        return this._statename;
    };
    return PlayerFightState;
}());
