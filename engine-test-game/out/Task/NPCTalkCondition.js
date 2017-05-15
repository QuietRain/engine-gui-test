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
var NPCTalkCondition = (function (_super) {
    __extends(NPCTalkCondition, _super);
    function NPCTalkCondition() {
        return _super.call(this) || this;
    }
    NPCTalkCondition.prototype.onAccept = function (task) {
        if (task.getcurrent() == currentStatus.NOT_CONTINUABLE) {
            task.setcurrent(currentStatus.CONTINUABLE);
        }
        if (task.getcurrent() >= currentStatus.CONTINUABLE) {
            task.setcurrent(task.getcurrent() + 1);
        }
    };
    NPCTalkCondition.prototype.onSubmit = function (task) {
        task.setcurrent(currentStatus.FINISH);
    };
    return NPCTalkCondition;
}(TaskCondition));
