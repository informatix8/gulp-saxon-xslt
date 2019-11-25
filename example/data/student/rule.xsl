<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:functx="http://www.functx.com" exclude-result-prefixes="fn functx">
  <xsl:import href="functx.xsl" />
  <xsl:template match="/">
    <xsl:param name="lorem" select="lorem" />
    <xsl:param name="ipsum" select="ipsum" />
    <html>

    <body>
      <h1 align="center">Students' Basic Details </h1>
      <h2>Value Lorem
        <xsl:value-of select="$lorem" />
      </h2>
      <h2>Value Ipsum
        <xsl:value-of select="$ipsum" />
      </h2>
      <table border="3" align="center">
        <tr>
          <th>Name</th>
          <th>Branch</th>
          <th>Age</th>
          <th>City</th>
          <th>Reverse City</th>
        </tr>
        <xsl:for-each select="student/s">
          <tr>
            <td>
              <xsl:value-of select="name" />
            </td>
            <td>
              <xsl:value-of select="branch" />
            </td>
            <td>
              <xsl:value-of select="age" />
            </td>
            <td>
              <xsl:value-of select="city" />
            </td>
            <td>
              <xsl:value-of select="functx:reverse-string(city)" />
            </td>
          </tr>
        </xsl:for-each>
      </table>
    </body>

    </html>
  </xsl:template>
</xsl:stylesheet>
