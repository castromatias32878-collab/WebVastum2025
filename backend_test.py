#!/usr/bin/env python3
"""
Backend Testing Suite for VASTUM Contact Management System
Tests all backend endpoints and validations
"""

import requests
import json
import os
from datetime import datetime
import sys

# Get backend URL from environment
BACKEND_URL = "https://waste-manager-ar.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

class BackendTester:
    def __init__(self):
        self.test_results = {
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        self.created_contacts = []

    def test_server_health(self):
        """Test if the server is running and accessible"""
        print_test_header("Server Health Check")
        
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            if response.status_code == 200:
                print_success(f"Server is running - Status: {response.status_code}")
                print_info(f"Response: {response.json()}")
                self.test_results['passed'] += 1
                return True
            else:
                print_error(f"Server responded with status: {response.status_code}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Server health check failed: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            print_error(f"Cannot connect to server: {str(e)}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Server connection failed: {str(e)}")
            return False

    def test_create_contact_valid(self):
        """Test creating a contact with valid data"""
        print_test_header("Create Contact - Valid Data")
        
        valid_contact = {
            "nombre": "Juan Carlos Pérez",
            "email": "juan.perez@municipalidad.gov.ar",
            "telefono": "+54 11 4567-8900",
            "empresa": "Municipalidad de Buenos Aires",
            "tipoEmpresa": "Municipalidad",
            "mensaje": "Estamos interesados en implementar VASTUM para la gestión de residuos en nuestra ciudad."
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contacto",
                json=valid_contact,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                print_success(f"Contact created successfully - Status: {response.status_code}")
                print_info(f"Response: {json.dumps(data, indent=2)}")
                
                # Verify response structure
                if data.get('success') and data.get('id'):
                    print_success("Response has correct structure (success=True, id present)")
                    self.created_contacts.append(data.get('id'))
                    self.test_results['passed'] += 1
                else:
                    print_error("Response missing required fields (success, id)")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Invalid response structure for valid contact creation")
            else:
                print_error(f"Failed to create contact - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Valid contact creation failed: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print_error(f"Request failed: {str(e)}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Valid contact creation request failed: {str(e)}")

    def test_create_contact_missing_fields(self):
        """Test creating a contact with missing required fields"""
        print_test_header("Create Contact - Missing Required Fields")
        
        invalid_contacts = [
            {
                "test_name": "Missing nombre",
                "data": {
                    "email": "test@example.com",
                    "telefono": "123456789",
                    "empresa": "Test Company",
                    "tipoEmpresa": "Empresa Privada"
                }
            },
            {
                "test_name": "Missing email",
                "data": {
                    "nombre": "Test User",
                    "telefono": "123456789",
                    "empresa": "Test Company",
                    "tipoEmpresa": "Empresa Privada"
                }
            },
            {
                "test_name": "Missing telefono",
                "data": {
                    "nombre": "Test User",
                    "email": "test@example.com",
                    "empresa": "Test Company",
                    "tipoEmpresa": "Empresa Privada"
                }
            },
            {
                "test_name": "Missing empresa",
                "data": {
                    "nombre": "Test User",
                    "email": "test@example.com",
                    "telefono": "123456789",
                    "tipoEmpresa": "Empresa Privada"
                }
            },
            {
                "test_name": "Missing tipoEmpresa",
                "data": {
                    "nombre": "Test User",
                    "email": "test@example.com",
                    "telefono": "123456789",
                    "empresa": "Test Company"
                }
            }
        ]
        
        for test_case in invalid_contacts:
            print_info(f"Testing: {test_case['test_name']}")
            
            try:
                response = requests.post(
                    f"{API_BASE}/contacto",
                    json=test_case['data'],
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 422:  # Validation error expected
                    print_success(f"Correctly rejected {test_case['test_name']} - Status: {response.status_code}")
                    self.test_results['passed'] += 1
                else:
                    print_error(f"Should have rejected {test_case['test_name']} - Status: {response.status_code}")
                    print_error(f"Response: {response.text}")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append(f"Missing field validation failed for: {test_case['test_name']}")
                    
            except requests.exceptions.RequestException as e:
                print_error(f"Request failed for {test_case['test_name']}: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Request failed for {test_case['test_name']}: {str(e)}")

    def test_create_contact_invalid_email(self):
        """Test creating a contact with invalid email format"""
        print_test_header("Create Contact - Invalid Email Format")
        
        invalid_emails = [
            "invalid-email",
            "test@",
            "@example.com",
            "test.example.com",
            "test@.com"
        ]
        
        for invalid_email in invalid_emails:
            print_info(f"Testing invalid email: {invalid_email}")
            
            contact_data = {
                "nombre": "Test User",
                "email": invalid_email,
                "telefono": "123456789",
                "empresa": "Test Company",
                "tipoEmpresa": "Empresa Privada"
            }
            
            try:
                response = requests.post(
                    f"{API_BASE}/contacto",
                    json=contact_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 422:  # Validation error expected
                    print_success(f"Correctly rejected invalid email: {invalid_email}")
                    self.test_results['passed'] += 1
                else:
                    print_error(f"Should have rejected invalid email: {invalid_email} - Status: {response.status_code}")
                    print_error(f"Response: {response.text}")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append(f"Email validation failed for: {invalid_email}")
                    
            except requests.exceptions.RequestException as e:
                print_error(f"Request failed for invalid email {invalid_email}: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Request failed for invalid email {invalid_email}: {str(e)}")

    def test_create_contact_invalid_company_type(self):
        """Test creating a contact with invalid company type"""
        print_test_header("Create Contact - Invalid Company Type")
        
        invalid_types = [
            "InvalidType",
            "Empresa",
            "Gobierno",
            "ONG",
            ""
        ]
        
        for invalid_type in invalid_types:
            print_info(f"Testing invalid company type: {invalid_type}")
            
            contact_data = {
                "nombre": "Test User",
                "email": "test@example.com",
                "telefono": "123456789",
                "empresa": "Test Company",
                "tipoEmpresa": invalid_type
            }
            
            try:
                response = requests.post(
                    f"{API_BASE}/contacto",
                    json=contact_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 400:  # Bad request expected
                    print_success(f"Correctly rejected invalid company type: {invalid_type}")
                    self.test_results['passed'] += 1
                else:
                    print_error(f"Should have rejected invalid company type: {invalid_type} - Status: {response.status_code}")
                    print_error(f"Response: {response.text}")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append(f"Company type validation failed for: {invalid_type}")
                    
            except requests.exceptions.RequestException as e:
                print_error(f"Request failed for invalid company type {invalid_type}: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Request failed for invalid company type {invalid_type}: {str(e)}")

    def test_valid_company_types(self):
        """Test all valid company types"""
        print_test_header("Create Contact - All Valid Company Types")
        
        valid_types = [
            "Municipalidad",
            "Empresa Privada", 
            "Cooperativa",
            "Organismo Provincial",
            "Otro"
        ]
        
        for company_type in valid_types:
            print_info(f"Testing valid company type: {company_type}")
            
            contact_data = {
                "nombre": f"Usuario {company_type}",
                "email": f"test.{company_type.lower().replace(' ', '.')}@example.com",
                "telefono": "123456789",
                "empresa": f"Test {company_type}",
                "tipoEmpresa": company_type,
                "mensaje": f"Mensaje de prueba para {company_type}"
            }
            
            try:
                response = requests.post(
                    f"{API_BASE}/contacto",
                    json=contact_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 201:
                    data = response.json()
                    print_success(f"Successfully created contact with company type: {company_type}")
                    if data.get('id'):
                        self.created_contacts.append(data.get('id'))
                    self.test_results['passed'] += 1
                else:
                    print_error(f"Failed to create contact with valid company type: {company_type} - Status: {response.status_code}")
                    print_error(f"Response: {response.text}")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append(f"Valid company type creation failed for: {company_type}")
                    
            except requests.exceptions.RequestException as e:
                print_error(f"Request failed for valid company type {company_type}: {str(e)}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Request failed for valid company type {company_type}: {str(e)}")

    def test_get_contacts(self):
        """Test getting all contacts"""
        print_test_header("Get All Contacts")
        
        try:
            response = requests.get(
                f"{API_BASE}/contactos",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Successfully retrieved contacts - Status: {response.status_code}")
                
                # Verify response structure
                if data.get('success') and 'contactos' in data and 'total' in data:
                    print_success("Response has correct structure (success, contactos, total)")
                    print_info(f"Total contacts found: {data.get('total')}")
                    
                    # Check if contacts are sorted by created_at descending
                    contactos = data.get('contactos', [])
                    if len(contactos) > 1:
                        dates_sorted = True
                        for i in range(len(contactos) - 1):
                            if 'created_at' in contactos[i] and 'created_at' in contactos[i + 1]:
                                if contactos[i]['created_at'] < contactos[i + 1]['created_at']:
                                    dates_sorted = False
                                    break
                        
                        if dates_sorted:
                            print_success("Contacts are correctly sorted by created_at (descending)")
                        else:
                            print_warning("Contacts may not be sorted correctly by created_at")
                    
                    self.test_results['passed'] += 1
                else:
                    print_error("Response missing required fields (success, contactos, total)")
                    self.test_results['failed'] += 1
                    self.test_results['errors'].append("Invalid response structure for get contacts")
            else:
                print_error(f"Failed to get contacts - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append(f"Get contacts failed: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print_error(f"Request failed: {str(e)}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Get contacts request failed: {str(e)}")

    def test_contact_optional_message(self):
        """Test creating contact without optional message field"""
        print_test_header("Create Contact - Without Optional Message")
        
        contact_data = {
            "nombre": "María González",
            "email": "maria.gonzalez@cooperativa.com.ar",
            "telefono": "+54 351 123-4567",
            "empresa": "Cooperativa de Recicladores Unidos",
            "tipoEmpresa": "Cooperativa"
            # mensaje is intentionally omitted
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contacto",
                json=contact_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 201:
                data = response.json()
                print_success("Successfully created contact without optional message field")
                if data.get('id'):
                    self.created_contacts.append(data.get('id'))
                self.test_results['passed'] += 1
            else:
                print_error(f"Failed to create contact without message - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                self.test_results['failed'] += 1
                self.test_results['errors'].append("Contact creation without optional message failed")
                
        except requests.exceptions.RequestException as e:
            print_error(f"Request failed: {str(e)}")
            self.test_results['failed'] += 1
            self.test_results['errors'].append(f"Contact creation without message request failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print(f"{Colors.BOLD}{Colors.BLUE}")
        print("=" * 80)
        print("VASTUM BACKEND TESTING SUITE")
        print("=" * 80)
        print(f"{Colors.ENDC}")
        
        print_info(f"Testing backend at: {API_BASE}")
        
        # Run all tests
        if self.test_server_health():
            self.test_create_contact_valid()
            self.test_create_contact_missing_fields()
            self.test_create_contact_invalid_email()
            self.test_create_contact_invalid_company_type()
            self.test_valid_company_types()
            self.test_contact_optional_message()
            self.test_get_contacts()
        else:
            print_error("Skipping other tests due to server connectivity issues")
        
        # Print final results
        self.print_final_results()

    def print_final_results(self):
        """Print final test results summary"""
        print(f"\n{Colors.BOLD}{Colors.BLUE}")
        print("=" * 80)
        print("FINAL TEST RESULTS")
        print("=" * 80)
        print(f"{Colors.ENDC}")
        
        total_tests = self.test_results['passed'] + self.test_results['failed']
        
        if self.test_results['failed'] == 0:
            print_success(f"ALL TESTS PASSED! ({self.test_results['passed']}/{total_tests})")
        else:
            print_error(f"SOME TESTS FAILED: {self.test_results['failed']}/{total_tests}")
            print_success(f"Tests passed: {self.test_results['passed']}/{total_tests}")
        
        if self.test_results['errors']:
            print(f"\n{Colors.RED}{Colors.BOLD}ERRORS ENCOUNTERED:{Colors.ENDC}")
            for i, error in enumerate(self.test_results['errors'], 1):
                print(f"{Colors.RED}{i}. {error}{Colors.ENDC}")
        
        if self.created_contacts:
            print(f"\n{Colors.GREEN}Created contact IDs during testing:{Colors.ENDC}")
            for contact_id in self.created_contacts:
                print(f"  - {contact_id}")
        
        print(f"\n{Colors.BLUE}Testing completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.ENDC}")

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()