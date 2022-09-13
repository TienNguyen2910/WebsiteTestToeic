using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebsiteTestToeic.Database.Migrations
{
    public partial class two : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "ExamTime",
                table: "Test",
                type: "time",
                unicode: false,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldUnicode: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ExamTime",
                table: "Test",
                type: "datetime2",
                unicode: false,
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time",
                oldUnicode: false);
        }
    }
}
