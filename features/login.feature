Feature: Login Load

  Scenario: Basic Load
    Given base URL is "https://test.k6.io"
    And virtual users is 10
    And duration is "10s"
    When users send GET request to "/"
    Then response status should be 200
