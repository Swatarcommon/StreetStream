using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class updaterefreshtokenreferencestoRegularaccount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_RegularAccounts_RegularAccountId",
                table: "RefreshTokens");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_RegularAccounts_RegularAccountId",
                table: "RefreshTokens",
                column: "RegularAccountId",
                principalTable: "RegularAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_RegularAccounts_RegularAccountId",
                table: "RefreshTokens");

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_RegularAccounts_RegularAccountId",
                table: "RefreshTokens",
                column: "RegularAccountId",
                principalTable: "RegularAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
