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
var NPC = (function (_super) {
    __extends(NPC, _super);
    //private taskList: Task[] = [];      //
    function NPC(_stage, NpcId, emoji, accept_mark, unfinish_mark, finish_mark, dialoguePanel, npc_x, npc_y) {
        var _this = _super.call(this) || this;
        _this._emoji = new dessert.Bitmap();
        _this._accept_mark = new dessert.Bitmap();
        _this._unfinish_mark = new dessert.Bitmap();
        _this._finish_mark = new dessert.Bitmap();
        _this.MARK_Y = -120;
        _this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this._id || taskList[taskid].condition.toNpcId == _this._id)) {
                    return taskList[taskid];
                }
            }
            return null;
        };
        _this._stage = _stage;
        _this._emoji.imageResource = dessert.res.get(emoji);
        _this._accept_mark.imageResource = dessert.res.get(accept_mark);
        _this._unfinish_mark.imageResource = dessert.res.get(unfinish_mark);
        _this._finish_mark.imageResource = dessert.res.get(finish_mark);
        _this._id = NpcId;
        _this.dialoguePanel = dialoguePanel;
        _this._emoji.touchEnabled = false;
        _this._accept_mark.y = _this.MARK_Y;
        _this._unfinish_mark.y = _this.MARK_Y;
        _this._finish_mark.y = _this.MARK_Y;
        _this._accept_mark.alpha = 0;
        _this._unfinish_mark.alpha = 0;
        _this._finish_mark.alpha = 0;
        _this.addChild(_this._emoji);
        _this.addChild(_this._accept_mark);
        _this.addChild(_this._unfinish_mark);
        _this.addChild(_this._finish_mark);
        _this.npc_x = npc_x;
        _this.npc_y = npc_y;
        _this.addEventListener(dessert.MouseState.MOUSE_CLICK, function () {
            console.log("点击npc了");
            if (!User.user.statemachine.locked) {
                console.log(_this._id + " is click");
                User.user.List.cancel();
                User.user.List.addCommand(new WalkCommand(_this.npc_x * GameMap.gamemap.Boxsize, _this.npc_y * GameMap.gamemap.Boxsize));
                User.user.List.addCommand(new TalkCommand(_this));
                User.user.List.execute();
            }
        });
        _this.touchEnabled = true;
        return _this;
    }
    NPC.prototype.NPCtalk = function (callback) {
        var statemachine = User.user.statemachine;
        statemachine.locked++;
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule);
        if (task == null) {
            this.dialoguePanel.setTaskFiled("没有任务了！！！");
        }
        this._stage.addChild(this.dialoguePanel);
        this.dialoguePanel.onChange(task);
        this.dialoguePanel.setTaskFiled(task.desc);
        TaskService.taskService.notify();
        callback(); //回调
    };
    NPC.prototype.onChange = function (task) {
        console.log(task.id + " " + this._id + " is on Change!!");
        if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this._id) {
            console.log(this._id + "可接任务");
            this._accept_mark.alpha = 1;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this._id) {
            console.log(this._id + "进行中 现Npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 1;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = true;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this._id) {
            console.log(this._id + "进行中任务 原npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this._id) {
            console.log(this._id + "可交任务 现npc");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 1;
            this._emoji.touchEnabled = true;
            return;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            console.log(this._id + "已交任务");
            this._accept_mark.alpha = 0;
            this._unfinish_mark.alpha = 0;
            this._finish_mark.alpha = 0;
            this._emoji.touchEnabled = false;
            // return 1;
        }
    };
    return NPC;
}(dessert.DisplayObjectContainer));
