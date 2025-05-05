import ru.itmo.webserver.beans.ResultBean;
import ru.itmo.webserver.res.Result;

import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

@RunWith(Parameterized.class)
public class CalculatorTest {
    private final float x;
    private final float y;
    private final int r;
    private final boolean expected;

    public CalculatorTest(float x, float y, int r, boolean expected) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.expected = expected;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(new Object[][]{
                {0, 0, 1, true},
                {1, 1, 1, false}
        });
    }

    @org.junit.Test
    public void testCalcHit() {
        Result point = new Result();
        point.setX(x);
        point.setY(y);
        point.setR(r);

        ResultBean bean = new ResultBean();
        boolean actual = bean.checkPoint(point);

        assertThat("x =" + x + ", y =" + y + ", r =" + r, actual, is(expected));
    }

}
