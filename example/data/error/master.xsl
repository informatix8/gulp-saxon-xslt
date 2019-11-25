<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fn="http://www.w3.org/2005/xpath-functions" xmlns:functx="http://www.functx.com" exclude-result-prefixes="fn functx">
  <xsl:import href="functx.xsl" />
  <xsl:param name="lorem" select="lorem" />
  <xsl:param name="ipsum" select="ipsum" />
  <xsl:template match="/">
    <xsl:variable name="docid" select="fn:lower-case(//docid)" />
    <xsl:for-each select="//testrun">
      <xsl:variable name="filename" select="concat('tmp/', $docid, '-', @run, '-', $lorem, '.html')" />
      <xsl:result-document href="{$filename}" method="html" omit-xml-declaration="yes">
        <html>

        <head>
          <title>Test results -
            <xsl:value-of select="$docid" /> -
            <xsl:value-of select="@run" />
          </title>
          <meta name="docid">
          <xsl:attribute name="content">
            <xsl:value-of select="$docid" />
          </xsl:attribute>
          </meta>
          <meta name="lorem">
          <xsl:attribute name="content">
            <xsl:value-of select="$lorem" />
          </xsl:attribute>
          </meta>
          <meta name="ipsum">
          <xsl:attribute name="content">
            <xsl:value-of select="$ipsum" />
          </xsl:attribute>
          </meta>
        </head>

        <body>
          <h1>
            <xsl:value-of select="@run" />
          </h1>
          <h2>Plain</h2>
          <p>
            <xsl:value-of select="sentence" />
          </p>
          <h2>Lower Case</h2>
          <p>
            <xsl:value-of select="fn:lower-case(sentence)" />
          </p>
          <h2>Reversed</h2>
          <p>
            <xsl:value-of select="functx:reverse-string(sentence)" />
          </p>
          <table>
            <tr>
              <td>Test</td>
              <td>Pass</td>
            </tr>
            <xsl:for-each select="test">
              <tr>
                <td>
                  <xsl:value-of select="@name" />
                </td>
                <td>
                  <xsl:value-of select="@pass" />
                </td>
              </tr>
            </xsl:for-each>
          </table>
        </body>

        </html>
      </xsl:result-document>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
