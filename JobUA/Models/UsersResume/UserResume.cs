using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.UserResume
{
    public class UsersResume
    {
        [BsonId]
        public string ResumeId { get; set; }
        public string UserId { get; set; }
    }
}
