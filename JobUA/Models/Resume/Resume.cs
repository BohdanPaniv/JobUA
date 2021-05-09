using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.Resume
{
    public class Resume
    {
        [BsonId]
        public string ResumeId { get; set; }
        public string Post { get; set; }
        public string City { get; set; }
        public string TypeOfEmployment { get; set; }
        public string Salary { get; set; }
        public bool IsWorkExperience { get; set; }
        public string CompanyName { get; set; }
        public string CompanyCity { get; set; }
        public string CompanyPost { get; set; }
        public string PeriodOfWorkStart { get; set; }
        public string PeriodOfWorkEnd { get; set; }
        public string Achievements { get; set; }
        public string EducationalLevel { get; set; }
        public string EducationalInstitution { get; set; }
        public string EducationCity { get; set; }
        public string Specialty { get; set; }
        public string TrainingPeriodStart { get; set; }
        public string TrainingPeriodEnd { get; set; }
        public string PublicationDate { get; set; }
    }
}
