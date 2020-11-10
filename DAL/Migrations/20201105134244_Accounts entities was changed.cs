using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Accountsentitieswaschanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RegularAccounts_Id",
                table: "RegularAccounts");

            migrationBuilder.DropIndex(
                name: "IX_CommercialAccounts_Id",
                table: "CommercialAccounts");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "RegularAccounts",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RegularAccounts_Email",
                table: "RegularAccounts",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CommercialAccounts_Email",
                table: "CommercialAccounts",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_RegularAccounts_Email",
                table: "RegularAccounts");

            migrationBuilder.DropIndex(
                name: "IX_CommercialAccounts_Email",
                table: "CommercialAccounts");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "RegularAccounts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RegularAccounts_Id",
                table: "RegularAccounts",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CommercialAccounts_Id",
                table: "CommercialAccounts",
                column: "Id");
        }
    }
}
