using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobUA.Models.Employer
{
    public class Employer
    {
        [BsonId]
        public string EmployerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string CompanyName { get; set; }
        [BsonIgnoreIfNull]
        public string EmployeeCount { get; set; }
        public string CompanyLink { get; set; }
        public string Description { get; set; }
        public string Phone { get; set; }
    }
}
