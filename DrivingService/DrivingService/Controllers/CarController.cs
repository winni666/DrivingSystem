using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ivony.Data;
using Ivony.Data.SqlClient;
using Newtonsoft.Json;
using DrivingService.Models;

namespace DrivingService.Controllers
{
    public class CarController : Controller
    {
        // GET: Car
        private static SqlDbExecutor db = SqlServer.FromConfiguration("connection");
        public object List()
        {
            var list = db.T("select * from car").ExecuteDataTable();
            return Content(JsonConvert.SerializeObject(list), "application/json");
        }
        public object delete(string carid)
        {
            db.T("delete from car where car_id={0} ", carid).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public object add(string car_type, string car_state, string car_number, string car_remark)
        {
            var carName = "";

            dynamic carNumber = db.T("select count(*) from car where car_number={0}", car_number).ExecuteScalar();

            if (carNumber > 0)
            {
                return Json(new { success = false, reason = "此车牌号已存在！" }, JsonRequestBehavior.AllowGet);
            }

            switch (car_type)
            {
                case "A1":
                    carName = "大型客车";
                    break;
                case "A2":
                    carName = "牵引车";
                    break;
                case "A3":
                    carName = "城市公交车";
                    break;
                case "B1":
                    carName = "中型客车";
                    break;
                case "B2":
                    carName = "大型货车";
                    break;
                case "C1":
                    carName = "小型汽车";
                    break;
                case "C2":
                    carName = "小型自动挡汽车";
                    break;
                case "C3":
                    carName = "低速载货汽车";
                    break;
                case "C4":
                    carName = "三轮汽车";
                    break;
            }
            db.T("insert into car(car_type, car_state, car_number, car_name, car_remark) values ({...})", car_type, car_state, car_number, carName, car_remark).Execute();
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }
    }
}