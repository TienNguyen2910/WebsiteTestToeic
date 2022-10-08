using Autofac;
using WebsiteTestToeic.Database.Implement;
using WebsiteTestToeic.Database.Interface;

namespace WebsiteTestToeic.Host.Autofac
{
    public class AutofacBusinessModule : Module
    {
        protected  override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<QuestionRepository>().As<IQuestionRepository>().InstancePerLifetimeScope();
            builder.RegisterType<TestRepository>().As<ITestRepository>().SingleInstance();
            builder.RegisterType<UserRepository>().As<IUserRepository>().SingleInstance();
            builder.RegisterType<QuizRepository>().As<IQuizRepository>().InstancePerLifetimeScope();
        }
    }
}
