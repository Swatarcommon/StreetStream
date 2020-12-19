using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class UpdatecategoryEventtocascadebehavior : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryEvents_EventCategories_CategoryId",
                table: "CategoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryEvents_Events_EventId",
                table: "CategoryEvents");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryEvents_EventCategories_CategoryId",
                table: "CategoryEvents",
                column: "CategoryId",
                principalTable: "EventCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryEvents_Events_EventId",
                table: "CategoryEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryEvents_EventCategories_CategoryId",
                table: "CategoryEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryEvents_Events_EventId",
                table: "CategoryEvents");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryEvents_EventCategories_CategoryId",
                table: "CategoryEvents",
                column: "CategoryId",
                principalTable: "EventCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryEvents_Events_EventId",
                table: "CategoryEvents",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
