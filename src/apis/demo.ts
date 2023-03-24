import http from './http';
class Demo {
  fetchOne(id: string) {
    return http.get(`/demo/${id}`);
  }
}

export default new Demo();
