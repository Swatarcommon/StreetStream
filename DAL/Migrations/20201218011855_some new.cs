using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class somenew : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_CommercialAccounts_CommercialAccountId",
                table: "Events");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_CommercialAccounts_CommercialAccountId",
                table: "Events",
                column: "CommercialAccountId",
                principalTable: "CommercialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_CommercialAccounts_CommercialAccountId",
                table: "Events");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_CommercialAccounts_CommercialAccountId",
                table: "Events",
                column: "CommercialAccountId",
                principalTable: "CommercialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
