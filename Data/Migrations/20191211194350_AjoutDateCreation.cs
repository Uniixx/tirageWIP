using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Tirage.Data.Migrations
{
    public partial class AjoutDateCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Creation_Date",
                table: "Tickets",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Creation_Date",
                table: "Tickets");
        }
    }
}
