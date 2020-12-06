using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DAL.Migrations
{
    public partial class AddedRefreshTokenstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(nullable: false),
                    Expires = table.Column<DateTime>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    CreatedByIp = table.Column<string>(nullable: false),
                    Revoked = table.Column<DateTime>(nullable: false),
                    RevokedByIp = table.Column<string>(nullable: false),
                    ReplacedByToken = table.Column<string>(nullable: false),
                    CommercialAccountId = table.Column<long>(nullable: true),
                    RegularAccountId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_CommercialAccounts_CommercialAccountId",
                        column: x => x.CommercialAccountId,
                        principalTable: "CommercialAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_RegularAccounts_RegularAccountId",
                        column: x => x.RegularAccountId,
                        principalTable: "RegularAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_CommercialAccountId",
                table: "RefreshTokens",
                column: "CommercialAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_Id",
                table: "RefreshTokens",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_RegularAccountId",
                table: "RefreshTokens",
                column: "RegularAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshTokens");
        }
    }
}
