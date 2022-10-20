using Microsoft.EntityFrameworkCore;
//using System.Data.Entity;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.DatabaseContext
{
    public class TestToeicDbContext : DbContext
    {
        public TestToeicDbContext()
        {

        }
        
        public TestToeicDbContext(DbContextOptions<TestToeicDbContext> options) 
            : base( options)
        { }

        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Test> Tests { get; set; }
        public virtual DbSet<Quiz> Quizzes { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<Result> Results { get; set; }
        public virtual DbSet<ResultDetail> ResultDetail { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server=LAPTOP-7D6S6BK0\\SQLEXPRESS;database=TestToeicDB;Trusted_Connection=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property("RoleName")
                      .HasMaxLength(50)
                      .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.UserName)
                      .HasMaxLength(100)
                      .IsUnicode(false);
                entity.Property(e => e.DateOfBirth)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Email)
                      .HasMaxLength(50)
                      .IsUnicode(false);
                entity.Property(e => e.Password)
                       .HasMaxLength(100)
                       .IsUnicode(false);

                entity.HasOne(r => r.Role)
                       .WithMany(u => u.Users)
                       .HasForeignKey(u => u.RoleId)
                       .HasConstraintName("FK__User_Role");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test");
                entity.Property(e => e.Id).ValueGeneratedOnAdd() ;

                entity.Property(e => e.ExamTime)
                      .IsUnicode(false);
                entity.Property(e => e.TypeTest)
                      .HasMaxLength(30)
                      .IsUnicode(false);
            });

            modelBuilder.Entity<Quiz>(entity =>
            {
                entity.ToTable("Quiz");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Title)
                      .HasMaxLength(50)
                      .IsUnicode(false);

                entity.HasOne(u => u.User)
                     .WithMany(q => q.QuizzesList)
                     .HasForeignKey(q => q.ActorId)
                     .HasConstraintName("FK__Quiz_User");

                entity.HasOne(t => t.Test)
                      .WithMany(q => q.QuizzesList)
                      .HasForeignKey(q => q.TestId)
                      .HasConstraintName("FK__Quiz_Test");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.ToTable("Question");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Image)
                      .HasMaxLength(100)
                      .IsUnicode(false);
                entity.Property(e => e.AudioFile)
                       .HasMaxLength(100)
                       .IsUnicode(false);
                entity.Property(e => e.ContentQuestion)
                       .IsUnicode(false);
                entity.Property(e => e.ContentScript)
                       .IsUnicode(false);

                entity.Property(e => e.NumPart)
                      .IsUnicode(false);
                entity.HasOne(q => q.Quiz)
                      .WithMany(q1 => q1.QuestionsList)
                      .HasForeignKey(q1 => q1.QuizId)
                      .HasConstraintName("FK__Question_Quiz");
            });

            modelBuilder.Entity<Answer>(entity =>
            {
                entity.ToTable("Answer");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(q => q.Question)
                      .WithMany(a => a.Answers)
                      .HasForeignKey(a => a.QuestionId)
                      .HasConstraintName("FK__Answer_Question");

                entity.Property(e => e.ContentAnswer)
                      .IsUnicode(false);
                entity.Property(e => e.IsAnswer)
                       .IsUnicode(false);
            });

            modelBuilder.Entity<Result>(entity => 
            {
                entity.ToTable("Result");
                entity.Property(r => r.Id).ValueGeneratedOnAdd();

                entity.HasOne(u => u.User)
                      .WithMany(r => r.ResultsList)
                      .HasForeignKey(r => r.UserId)
                      .HasConstraintName("FK__Result_User");

                entity.HasOne(q => q.Quiz)
                      .WithMany(r => r.ResultsLists)
                      .HasForeignKey(r => r.QuizId)
                      .HasConstraintName("FK__Result_Quiz");

                entity.Property(r => r.StartedAt)
                      .IsUnicode(false);
                entity.Property(r => r.EndedAt)
                      .IsUnicode(false);
                entity.Property(r => r.Score)
                       .IsUnicode(false);
            });

            modelBuilder.Entity<ResultDetail>(entity =>
            {
                entity.ToTable("ResultDetail");
                entity.HasKey(e => e.Id);

                entity.HasOne(q => q.Question)
                      .WithMany(e => e.ResultDetailsList)
                      .HasForeignKey(e => e.QuestionId)
                      .HasConstraintName("FK__ResultDetail_Question");

                entity.HasOne(r => r.Result)
                      .WithMany(e => e.ResultDetailsList)
                      .HasForeignKey(e => e.ResultId)
                      .HasConstraintName("FK__ResultDetail_Result");

                entity.HasOne(a => a.Answer)
                      .WithMany(e => e.ResultDetailsList)
                      .HasForeignKey(e => e.AnswerSelectedId)
                      .HasConstraintName("FK__ResultDetail_Answer");
            });
        }
    }
}
