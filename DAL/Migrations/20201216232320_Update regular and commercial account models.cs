using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class Updateregularandcommercialaccountmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "RegularAccounts",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CommercialAccounts",
                maxLength: 12,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "CommercialAccounts",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Telephone",
                table: "CommercialAccounts",
                maxLength: 12,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "RegularAccounts");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CommercialAccounts");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "CommercialAccounts");

            migrationBuilder.DropColumn(
                name: "Telephone",
                table: "CommercialAccounts");
        }
    }
}
