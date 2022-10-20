using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebsiteTestToeic.Database.Migrations
{
    public partial class three : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Question_Quiz",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK__Quiz_Test",
                table: "Quiz");

            migrationBuilder.DropForeignKey(
                name: "FK__Result_Quiz",
                table: "Result");

            migrationBuilder.DropForeignKey(
                name: "FK__Result_User",
                table: "Result");

            migrationBuilder.DropColumn(
                name: "IsAnswerTrue",
                table: "ResultDetail");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Result",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "QuizId",
                table: "Result",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TestId",
                table: "Quiz",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "QuizId",
                table: "Question",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK__Question_Quiz",
                table: "Question",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__Quiz_Test",
                table: "Quiz",
                column: "TestId",
                principalTable: "Test",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__Result_Quiz",
                table: "Result",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__Result_User",
                table: "Result",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__Question_Quiz",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK__Quiz_Test",
                table: "Quiz");

            migrationBuilder.DropForeignKey(
                name: "FK__Result_Quiz",
                table: "Result");

            migrationBuilder.DropForeignKey(
                name: "FK__Result_User",
                table: "Result");

            migrationBuilder.AddColumn<bool>(
                name: "IsAnswerTrue",
                table: "ResultDetail",
                type: "bit",
                unicode: false,
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Result",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "QuizId",
                table: "Result",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TestId",
                table: "Quiz",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "QuizId",
                table: "Question",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK__Question_Quiz",
                table: "Question",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Quiz_Test",
                table: "Quiz",
                column: "TestId",
                principalTable: "Test",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Result_Quiz",
                table: "Result",
                column: "QuizId",
                principalTable: "Quiz",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK__Result_User",
                table: "Result",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
