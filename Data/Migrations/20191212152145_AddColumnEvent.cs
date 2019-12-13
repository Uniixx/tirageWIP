using Microsoft.EntityFrameworkCore.Migrations;

namespace Tirage.Data.Migrations
{
    public partial class AddColumnEvent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tickets_Events_EventId",
                table: "Tickets");

            migrationBuilder.DropIndex(
                name: "IX_Tickets_EventId",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "WinnerId",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "EventId",
                table: "Tickets",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EventId1",
                table: "Tickets",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TicketId",
                table: "Events",
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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "TicketId",
                table: "Events");

            migrationBuilder.AlterColumn<string>(
                name: "EventId",
                table: "Tickets",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WinnerId",
                table: "Events",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_EventId",
                table: "Tickets",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tickets_Events_EventId",
                table: "Tickets",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
