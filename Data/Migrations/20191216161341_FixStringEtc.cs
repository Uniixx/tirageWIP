using Microsoft.EntityFrameworkCore.Migrations;

namespace Tirage.Data.Migrations
{
    public partial class FixStringEtc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "Events");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "TicketId",
                table: "Events",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
