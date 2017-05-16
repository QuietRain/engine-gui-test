import * as path from 'path';
import * as fs from 'fs';
import * as cp from 'child_process';
export let run = () => {
    let canvas = document.getElementById("app") as HTMLCanvasElement;
    let stage = dessert.run(canvas);
    /**
     * 作为一个序列的cd命令shell
     */
    let projectUserPick = path.resolve(__dirname, "../../engine-test-game");
    if (!validProject(projectUserPick)) {
        alert("该文件夹不是一个有效的 Unity项目！");
    }
    else {
        var PID_number = 1338;//端口初始值
        portFunction(projectUserPick, PID_number);
    }

}


function validProject(projectUserPick: string): boolean {
    return true;
}

function portFunction(projectUserPick: string, PID_number: number) {
    console.log("projectUserPick:   " + projectUserPick);


    let child_process = cp.exec("dessert run " + projectUserPick);
    child_process.stdout.addListener("data", data => {                //标准输出
        console.log(data.toString());
        // if (data.toString().indexOf("Server listening to") >= 0) {//18  空格19 下一位20
        //     let PID = data.toString().substr(20);
        //     let PID_number = parseInt(PID);
        //     console.log("转化接口数字为： " + PID_number);
        //     console.log("换接口")
        //     //换接口
        //     let iframe = document.getElementById("preview") as HTMLIFrameElement;
        //     console.log("转换前： " + iframe.src);
        //     iframe.src = "http://localhost:1338/index.html";
        //     console.log("转换后 ：" + iframe.src);
        // }
    });

    child_process.stderr.addListener("data", data => {          //标准错误流
        console.log(data.toString());
    });

    child_process.addListener("close", () => {                 //生命周期结束
        console.log("关闭端口")

        console.log("当前端口数字为： " + PID_number);
        // PID_number = PID_number + 1;
        console.log("换端口,新端口为： " + PID_number);
        //换接口
        let iframe = document.getElementById("preview") as HTMLIFrameElement;
        console.log("转换前： " + iframe.src);
        iframe.src = "http://localhost:" + PID_number + "/index.html";
        console.log("转换后 ：" + iframe.src);
        // portFunction(projectUserPick, PID_number);
    });

}