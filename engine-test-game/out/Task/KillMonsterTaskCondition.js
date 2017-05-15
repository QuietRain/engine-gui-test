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
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(monsterNumber) {
        var _this = _super.call(this) || this;
        _this.monsterNumber = monsterNumber;
        return _this;
    }
    KillMonsterTaskCondition.prototype.onAccept = function (task) {
        if (task.getcurrent() == currentStatus.NOT_CONTINUABLE) {
            task.setcurrent(currentStatus.CONTINUABLE);
        }
        else if (task.getcurrent() >= currentStatus.CONTINUABLE) {
            task.setcurrent((task.getcurrent() + 1));
        }
    };
    KillMonsterTaskCondition.prototype.onSubmit = function (task) {
        task.setcurrent(currentStatus.FINISH);
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
