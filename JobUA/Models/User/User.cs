using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.User
{
    public class User
    {
        [BsonId]
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }
    }
}
