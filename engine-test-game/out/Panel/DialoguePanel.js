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
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(npcId, _stage, statemachine) {
        var _this = _super.call(this) || this;
        //	priate
        _this.height = 400;
        _this.width = 400;
        _this.button_height = 100;
        _this.button_width = 200;
        _this._rule = function (taskList) {
            for (var taskid in taskList) {
                if ((taskList[taskid].status == TaskStatus.ACCEPTABLE && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    (taskList[taskid].status == TaskStatus.DURING && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) ||
                    taskList[taskid].status == TaskStatus.CAN_SUBMIT && (taskList[taskid].condition.fromNpcId == _this.NPCId || taskList[taskid].condition.toNpcId == _this.NPCId)) {
                    console.log("Fromid: " + taskList[taskid].condition.fromNpcId + " toId: " + taskList[taskid].condition.toNpcId);
                    return taskList[taskid];
                }
            }
            return null;
        };
        _this._stage = _stage;
        _this.wordPanel = new dessert.Shape();
        _this.wordPanel.beginFill("#000000", 0.5);
        _this.wordPanel.drawRect(0, 0, _this.width, _this.height);
        _this.addChild(_this.wordPanel);
        _this.button = new dessert.TextField();
        _this.button.x = (_this.wordPanel.width - _this.button.width) / 2;
        _this.button.y = (_this.wordPanel.height - _this.button.height) / 2;
        _this.button.text = "继续";
        _this.addChild(_this.button);
        _this.textField = new dessert.TextField();
        _this.textField.textcolor = "#FFFFFF";
        _this.textField.y = 100;
        _this.addChild(_this.textField);
        _this.taskField = new dessert.TextField();
        _this.taskField.textcolor = "#FFFFFF";
        _this.taskField.y = 20;
        _this.addChild(_this.taskField);
        _this.button.touchEnabled = true;
        _this.NPCId = npcId;
        _this.button.textcolor = "#FFFFFF";
        _this.button.addEventListener(dessert.MouseState.MOUSE_CLICK, function () {
            _this.onButtonClick(statemachine);
        });
        return _this;
    }
    DialoguePanel.prototype.onButtonClick = function (statemachine) {
        var task = TaskService.taskService.getTaskbyCustomRole(this._rule); //找到当前任务
        var Service = TaskService;
        if (task == null) {
            console.log("没有任务");
        }
        // }
        // this.onChange(task);
        if (task == null) {
        }
        else if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            if (Service == TaskService) {
                TaskService.taskService.accept(task.id);
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            if (Service == TaskService) {
                console.log("调用taskservice");
                if (task.condition.fromNpcId != task.condition.toNpcId) {
                    task.condition.onAccept(task);
                }
                TaskService.taskService.notify();
            }
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            task.condition.onSubmit(task);
        }
        this._stage.removeChild(this);
        setTimeout(function () {
            if (statemachine.locked >= 0) {
                statemachine.locked--;
            }
        }, this, 300);
    };
    DialoguePanel.prototype.setTextField = function (text) {
        this.textField.text = text;
    };
    DialoguePanel.prototype.setTaskFiled = function (text) {
        this.taskField.text = text;
    };
    DialoguePanel.prototype.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "可接受任务，是否接受？";
            this.button.text = "接受";
            return;
        }
        else if (task.status == TaskStatus.DURING && task.condition.fromNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，不可交";
            this.button.text = "退出";
            return;
        }
        else if (task.status == TaskStatus.DURING && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，可完成";
            this.button.text = "完成";
            return;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT && task.condition.toNpcId == this.NPCId) {
            this.textField.text = "正在进行中任务，可交付";
            this.button.text = "交付";
            return;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.textField.text = "已完成的任务";
            this.button.text = "退出";
            return;
        }
    };
    return DialoguePanel;
}(dessert.DisplayObjectContainer));
