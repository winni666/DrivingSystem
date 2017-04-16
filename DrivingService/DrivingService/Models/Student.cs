using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DrivingService.Models
{
    public class Student
    {
        public string Id { set; get; }

        public string Name { set; get; }
        public string Sex { set; get; }

        public string Age { set; get; }
        public string Phone { set; get; }
        public string CardId { set; get; }
        public string SignDate { set; get; }
        public string SignPoint { set; get; }
        public string Photo { set; get; }
        public string IsTuition { set; get; }

        public string State { set; get; }

        public string SignDriving { set; get; }

        public string SignUser { set; get; }
        public string Remarks { set; get; }

        public string IsPhysical { set; get; }
    }
}