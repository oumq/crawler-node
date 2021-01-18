const { exec } = require("child_process");

const schedule = require("node-schedule");

const rule = new schedule.RecurrenceRule();

rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

schedule.scheduleJob(rule, function() {
  exec("yarn start", function (error, stdout, stderr) {
    if (error) {
      console.error("error: " + error);
      return;
    }
    console.log("stdout: " + stdout);
    console.log("stderr: " + typeof stderr);
  });
})
