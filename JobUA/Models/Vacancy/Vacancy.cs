using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.Vacancy
{
    public class Vacancy
    {
        [BsonId]
        public string VacancyId { get; set; }
        public string Post { get; set; }
        public string City { get; set; }
        public string TypeOfEmployment { get; set; }
        public string Salary { get; set; }
        public bool IsWorkExperience { get; set; }
        public string WorkExperiencePeriog { get; set; }
        public string EducationalLevel { get; set; }
        public string PublicationDate { get; set; }
        public string VacancyDescription { get; set; }
    }
}
