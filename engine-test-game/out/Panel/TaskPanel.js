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
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(_stage) {
        var _this = _super.call(this) || this;
        _this.height = 400;
        _this.width = 250;
        _this._stage = _stage;
        _this.wordPanel = new dessert.Shape();
        _this.wordPanel.beginFill("#000000", 0.5);
        _this.wordPanel.drawRect(0, 0, _this.width, _this.height);
        // this.wordPanel.endFill();
        _this.addChild(_this.wordPanel);
        _this.textField = new dessert.TextField();
        _this.textField.y = 200;
        _this.addChild(_this.textField);
        _this.taskname = new dessert.TextField();
        _this.taskname.y = 100;
        _this.addChild(_this.taskname);
        return _this;
    }
    TaskPanel.prototype.onChange = function (task) {
        console.log("taskpanel is onchange");
        if (task.status == TaskStatus.ACCEPTABLE) {
            this.taskname.text = task.name + "(可接受)";
            this.textField.text = task.desc;
            // return 0;
        }
        else if (task.status == TaskStatus.DURING) {
            if (task.total > 1) {
                this.taskname.text = task.name + "(进行中)( " + task.current + "/" + task.total + " )";
                this.textField.text = task.desc;
            }
            else {
                this.taskname.text = task.name + "(进行中)";
                this.textField.text = task.desc;
            }
            // return 0;
        }
        else if (task.status == TaskStatus.CAN_SUBMIT) {
            this.taskname.text = task.name + "(可交付)";
            this.textField.text = task.desc;
            // return 0;
        }
        else if (task.status == TaskStatus.SUBMITTED) {
            this.taskname.text = task.name + "(已完成)";
            this.textField.text = task.desc;
            // return 1;
        }
    };
    return TaskPanel;
}(dessert.DisplayObjectContainer));
