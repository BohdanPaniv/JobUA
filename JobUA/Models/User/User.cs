using MongoDB.Bson.Serialization.Attributes;

namespace JobUA.Models.User
{
    public class User
    {
        [BsonId]
        public string UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        [BsonIgnoreIfNull]
        public string ByFather { get; set; }
        [BsonIgnoreIfNull]
        public string Email { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        [BsonIgnoreIfNull]
        public string Birthday { get; set; }
        [BsonIgnoreIfNull]
        public string City { get; set; }
        [BsonIgnoreIfNull]
        public string Image { get; set; }
        [BsonIgnoreIfNull]
        public string Phone { get; set; }
    }
}