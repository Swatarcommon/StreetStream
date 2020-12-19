using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Addedcascadedeltebehaviortorefreshtokenmodel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_CommercialAccounts_CommercialAccountId",
                table: "RefreshTokens");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_CommercialAccounts_CommercialAccountId",
                table: "RefreshTokens",
                column: "CommercialAccountId",
                principalTable: "CommercialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_CommercialAccounts_CommercialAccountId",
                table: "RefreshTokens");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_CommercialAccounts_CommercialAccountId",
                table: "RefreshTokens",
                column: "CommercialAccountId",
                principalTable: "CommercialAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
