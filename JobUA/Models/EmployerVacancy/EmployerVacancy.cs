using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.EmployerVacancy
{
    public class EmployerVacancy
    {
        [BsonId]
        public string VacancyId { get; set; }
        public string EmployerId { get; set; }
    }
}
