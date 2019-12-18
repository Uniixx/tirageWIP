using Microsoft.EntityFrameworkCore.Migrations;

namespace Tirage.Data.Migrations
{
    public partial class ChangeStringToLong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Events_EventId1",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_EventId1",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "EventId1",
                table: "Tickets");

            migrationBuilder.AlterColumn<long>(
                name: "EventId",
                table: "Tickets",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Tickets",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Tickets");

            migrationBuilder.AlterColumn<string>(
                name: "EventId",
                table: "Tickets",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddColumn<long>(
                name: "EventId1",
                table: "Tickets",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_EventId1",
                table: "Tickets",
                column: "EventId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Events_EventId1",
                table: "Tickets",
                column: "EventId1",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
